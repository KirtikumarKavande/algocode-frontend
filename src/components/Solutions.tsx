import  { useEffect, useState } from "react";
import {  Copy } from "lucide-react";
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
import axios from "axios";
import { languages } from "../pages/utilities/constants";

const SolutionTab = () => {
  const problem = useGetSelectedProblem();
  console.log("inside solution", problem);
  const [solution,setSolution] = useState<any>(null);

  async function getSolutionById(id:string) {
    const res = await axios.get(
      `${import.meta.env.VITE_PROBLEM_SERVICE_URL}/v1/problems/solutions/${
       id
      }`
    );
    setSolution(res?.data.data.solution)
    console.log("my solution",res?.data.data.solution);
  }
  useEffect(() => {
    if (problem && problem._id) {
      getSolutionById(problem._id);
    }
  }, [problem._id]);
  

  // State for active language and copied status
  const [activeLanguage, setActiveLanguage] = useState("cpp");
  const [copied, setCopied] = useState(false);

  // Copy to clipboard function
  const handleCopy = () => {
    navigator.clipboard.writeText(solution[activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl max-w-4xl mx-auto">
      {/* Header with Language Tabs */}
      <div className="flex border-b border-gray-700 mb-4 pb-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`
              px-4 py-2 mr-2 rounded-t-lg transition-all duration-300
              ${
                activeLanguage === lang.code
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }
            `}
            onClick={() => setActiveLanguage(lang.code)}
          >
            {lang.name}
          </button>
        ))}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="ml-auto bg-gray-800 text-gray-400 hover:bg-gray-700 p-2 rounded-lg transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="text-green-500">Copied!</span>
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Code Display Area */}
      <div className="relative z-10 ">
        <pre className=" bg-gray-800 pl-12 py-1 rounded-lg overflow-auto max-h-[500px] text-sm font-mono ">
          <code className={`language-${activeLanguage}`}>
            {solution &&solution[activeLanguage]}
          </code>
        </pre>

        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 bg-gray-700 w-10 text-right pr-2 text-gray-500 select-none">
          {solution && solution[activeLanguage].split("\n").map((_:any, index:number) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
    </div>
  );
};

export default SolutionTab;
