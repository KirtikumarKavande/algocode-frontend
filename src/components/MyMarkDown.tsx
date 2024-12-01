import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const markdownText = `
# Problem Statement
Write a function that reverses a string. The input string is given as an array of characters \`s\`.  
You must do this by modifying the input array **in-place** with **O(1)** extra memory.

## Constraints
- (1 ≤ s.length ≤ 10^5)
- (s[i]) is a printable ASCII character
- Input is a character array that can be modified in-place

## Examples
### Example 1
**Input:**  
s = ["h","e","l","l","o"]  
**Output:**  
["o","l","l","e","h"]

### Example 2
**Input:**  
s = ["H","a","n","n","a","h"]  
**Output:**  
["h","a","n","n","a","H"]

    
    `;

const MyReactMarkDown = () => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => <h1 style={{ fontSize: "2em" }} {...props} />,
        h2: ({ ...props }) => (
          <h2 style={{ fontSize: "1.6em", fontWeight: "bold" }} {...props} />
        ),
        h3: ({ ...props }) => <h3 style={{ fontSize: "1.17em" }} {...props} />,
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
};

export default MyReactMarkDown;
