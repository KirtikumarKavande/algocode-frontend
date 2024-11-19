export interface result{
    testCase: string;
    passed: boolean;
    executionTime: number;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error: string;
}


export interface testCaseResult{
    status: string;
    error: string;
    results: result[];
    totalTestCases: number;
    passedTestCases: number;
}