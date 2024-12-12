import { useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { result } from "../types/testCase.types";

const Result = ({
  testCaseResult,
  isClickedOnSubmit,
}: {
  testCaseResult: any;
  isClickedOnSubmit: boolean;
}) => {
  const loadingText = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const texts = [
      "Compiling your code...",
      "Running test cases...",
      "Checking outputs...",
      "Almost there...",
      "Processing results...",
    ];
    let index = 0;

    const id = setInterval(() => {
      if (loadingText.current) {
        index = (index + 1) % texts.length;
        loadingText.current.textContent = texts[index];
      }
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, [isClickedOnSubmit]);

  if (isClickedOnSubmit) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] space-y-4 ">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p
          ref={loadingText}
          className="text-lg text-gray-600 animate-pulse"
          id="loadingText"
        >
          Compiling your code...
        </p>
      </div>
    );
  }
  const isEmpty = Object.keys(testCaseResult).length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] space-y-4 ">
        <div>Code has not been submitted yet Please submit to View Result</div>
      </div>
    );
  }

  const { status, error, results, totalTestCases, passedTestCases } =
    testCaseResult.testCaseResult;
console.log("results",results)
  if (status === "failed" && error) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Execution Error</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-red-600 font-mono text-sm">
            {error}
          </pre>
        </div>
        <div className="text-sm text-gray-600">
          Passed {passedTestCases} of {totalTestCases} test cases
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">Test Results</h2>
        <div className="text-sm font-bold ">
          Passed {passedTestCases} of {totalTestCases} test cases
        </div>
      </div>

      <div className="space-y-4">
        {results.map(
          (result: result) => (
            <div
              key={result.testCase}
              className={`border rounded-lg overflow-hidden ${
                result.passed ? "border-green-200" : "border-red-200"
              }`}
            >
              <div
                className={`p-4 flex items-center justify-between ${
                  result.passed ? "bg-green-200" : "bg-red-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-800" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-800" />
                  )}
                  <span className="font-medium text-black">
                    Test Case {result.testCase}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {result?.executionTime?.toFixed(2)}s
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      Input
                    </div>
                    <div className="mt-1 font-mono text-sm text-black bg-gray-50 p-2 rounded">
                      {result.input}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      Expected Output
                    </div>
                    <div className="mt-1 font-mono text-sm bg-gray-50 p-2 rounded text-black">
                      {result.expectedOutput}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Your Output
                  </div>
                  <div
                    className={`mt-1 font-mono text-sm p-2 rounded text-black ${
                      result.passed ? "bg-gray-50 " : "bg-red-200 "
                    }`}
                  >
                    {(!Array.isArray(result.actualOutput )?result.actualOutput:JSON.stringify(result.actualOutput)) || result?.error}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Result;
