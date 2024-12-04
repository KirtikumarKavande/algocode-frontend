import AceEditor from "react-ace";
import { Editor as IAceEditor } from '@types/ace';
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


const Editor = ({ selectedLang,setCode,code }: { selectedLang: string, setCode: (value: string) => void, code:string }) => {
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
      console.log("existing entry",existingEntry)

    })
     
      
    console.log("code stub",codeStub[selectedLang])

    }
  },[selectedLang,codeStub])
  console.log("code stub",codeStub)

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

  

  const onLoad = (editor:IAceEditor) => {

    editor.setOptions({
      enableBasicAutocompletion: true,  // Enable basic auto completion
      enableLiveAutocompletion: true,   // Enable live autocompletion
      enableSnippets: true,             // Enable snippets for autocompletion
      showLineNumbers: true,
      tabSize: 2,
    });
  };
  console.log("lang selected",selectedLang);

  return (
    <div>
      {" "}
      <AceEditor
        mode={"c_cpp"}
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
