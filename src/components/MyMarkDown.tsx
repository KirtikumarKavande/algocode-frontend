import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
import { ReceiptText } from "lucide-react";



const MyReactMarkDown = () => {
  const problem=useGetSelectedProblem()

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center space-x-1 items-center mb-4">
        <div><ReceiptText size={25}/></div>
        <div className="text-2xl  font-bold">{problem && problem.title}</div>
        </div>
        <div className=" mb-4">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ ...props }) => (
                <h1 style={{ fontSize: "2em" }} {...props} />
              ),
              h2: ({ ...props }) => (
                <h2
                  style={{ fontSize: "1.6em", fontWeight: "bold" }}
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3 style={{ fontSize: "1.17em" }} {...props} />
              ),
            }}
          >
            {problem &&problem.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MyReactMarkDown;
