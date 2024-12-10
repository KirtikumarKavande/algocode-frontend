import { NODE_IMAGE } from "../utilities/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullDockerImage from "./pullDockerImage";

async function runJavaScript(
  code: string,
  testCases: { input: string; output: string; _id?: string }[]
) {
  if (!Array.isArray(testCases)) {
    console.error("Invalid test cases format:", testCases);
    return {
      status: "failed",
      error: "Invalid test cases format",
      results: [],
      totalTestCases: 0,
      passedTestCases: 0
    };
  }

  let nodeDockerContainer = null;
  try {
    const rawLogBuffer: Buffer[] = [];
    console.log("Initializing a new Node.js docker container");
    console.log("Test Cases:", testCases);

    await pullDockerImage(NODE_IMAGE);

    // Prepare test cases by cleaning input format
    const cleanTestCases = testCases.map(tc => ({
      input: tc.input.trim(),
      output: tc.output.trim()
    }));

    const completeCode = `
    // Inject user-provided code
    ${code}

    // Test cases data
    const testCases = ${JSON.stringify(cleanTestCases)};
    function runTests() {
        const results = [];
        testCases.forEach((testCase, index) => {
            try {
                // Extract function name from the code
                const functionMatch = /function\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*\\(/.exec(\`${code}\`);
                const functionName = functionMatch ? functionMatch[1] : null;
                if (!functionName) {
                    throw new Error("No valid function found in code");
                }
                // Parse input - handle both space and comma separated values
                let inputs = testCase.input
                let parsedInput=JSON.parse(inputs)                      
                const startTime = process.hrtime();
                const result = eval(functionName + "(" +JSON.stringify(parsedInput)+ ")");
                const endTime = process.hrtime(startTime);
                const executionTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
                results.push({
                    testCase: index + 1,
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    actualOutput: result,
                    executionTime: parseFloat(executionTime),
                    passed: result.toString() === JSON.parse(testCase.output).toString(),
                });
            } catch (err) {
                results.push({
                    testCase: index + 1,
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    error: err.message,
                    executionTime: 0,
                    passed: false,
                });
            }
        });
        return results;
    }
    const results = runTests();
    console.log(JSON.stringify(results));
`;


    const runCommand = `echo '${completeCode.replace(
      /'/g,
      `'\\"`
    )}' > main.js && node main.js`;

    nodeDockerContainer = await createContainer(NODE_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);

    await nodeDockerContainer.start();
    console.log("Started the docker container");

    const loggerStream = await nodeDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true,
    });

    loggerStream.on("data", (chunk: Buffer) => {
      rawLogBuffer.push(chunk);
    });

    const response: any = await new Promise((resolve, reject) => {
      let timerId = setTimeout(() => {
        reject({ stderr: "Time Limit Exceeded" });
      }, 5000);

      loggerStream.on("end", () => {
        clearTimeout(timerId);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);

        if (decodedStream.stdout) {
          resolve(decodedStream);
        } else {
          reject(decodedStream);
        }
      });
    });

    // Parse results
    let executionResults;
    try {
      executionResults = JSON.parse(response.stdout);
      console.log("Execution results:", executionResults); // Debug log
    } catch (err) {
      console.error("Error parsing execution results:", err, "Raw stdout:", response.stdout);
      throw new Error("Failed to parse execution results");
    }

    const totalExecutionTime = executionResults.reduce(
      (sum: number, r: any) => sum + (r.executionTime || 0), 
      0
    );

    return {
      status: executionResults.every((r: any) => r.passed) ? "success" : "failed",
      results: executionResults,
      totalExecutionTime,
      totalTestCases: testCases.length,
      passedTestCases: executionResults.filter((r: any) => r.passed).length
    };

  } catch (error: any) {
    console.error("Error in runJavaScript:", error);
    if (error.stderr === "Time Limit Exceeded") {
      await nodeDockerContainer?.kill();
    }
    return {
      status: "failed",
      error: error.stderr || error.message || "Execution failed",
      results: [],
      totalTestCases: testCases.length,
      passedTestCases: 0
    };
  } finally {
    if (nodeDockerContainer) {
      try {
        await nodeDockerContainer.remove();
      } catch (cleanupError) {
        console.error("Error cleaning up container:", cleanupError);
      }
    }
  }
}

export default runJavaScript;