import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/ext-language_tools';  // This is necessary for enabling autocomplete
import 'ace-builds/src-noconflict/ext-beautify'; 
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
import { useEffect } from "react";
import { db } from "../indexDb/problem-solution.db";

import { config } from "ace-builds";

// Set the base path for workers
config.set("basePath", "/node_modules/ace-builds/src-noconflict");
const Editor = ({ selectedLang,setCode,code }: { selectedLang: string, setCode: (value: string) => void, code:string }) => {
  console.log("selectedLang",selectedLang)
  const problem=useGetSelectedProblem()
  const codeStub=problem?.initialCodeStub
  useEffect(()=>{
    if(codeStub){
      if(selectedLang==="c_cpp") selectedLang="cpp"
     
    db.userSolution.get(problem._id).then((existingEntry)=>{
      if(existingEntry?.solutions[selectedLang]){
        setCode(existingEntry.solutions[selectedLang])
      }else{
        setCode(codeStub[selectedLang])
      }

    })
     
      

    }
  },[selectedLang,codeStub])

  async function handleCodeChange(c: string) {
    const existingEntry = await db.userSolution.get(problem._id);
    const updatedSolutions = {
      ...existingEntry?.solutions, // Retain existing solutions
      [selectedLang]: c,    // Update the specific language code
    };
    await db.userSolution.put({
      problemId: problem._id,
      solutions: updatedSolutions,
    });

    setCode(c);
  }

  

  const onLoad = (editor:any) => {

    editor.setOptions({
      enableBasicAutocompletion: true,  // Enable basic auto completion
      enableLiveAutocompletion: true,   // Enable live autocompletion
      enableSnippets: true,             // Enable snippets for autocompletion
      showLineNumbers: true,
      tabSize: 2,
    });
  };

  return (
    <div className="w-full overflow-x-auto"> 
      {" "}
      <AceEditor
        mode={selectedLang}
        theme="monokai"
        width="100%"
        onChange={handleCodeChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height={"100vh"}
        fontSize={16}
        enableBasicAutocompletion={true}
        enableSnippets={true}
        enableLiveAutocompletion={true}
        value={code}
        onLoad={onLoad}
      />
    </div>
  );
};

export default Editor;
