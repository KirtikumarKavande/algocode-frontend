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


const Editor = ({ selectedLang,setCode,code }: { selectedLang: string, setCode: (value: string) => void, code:string }) => {
  const problem=useGetSelectedProblem()
  const codeStub=problem?.initialCodeStub
  useEffect(()=>{
    if(codeStub){
      if(selectedLang==="c_cpp") selectedLang="cpp"
      setCode(codeStub[selectedLang])
    console.log("code stub",codeStub[selectedLang])

    }
  },[selectedLang,codeStub])
  console.log("code stub",codeStub)

  function handleCodeChange(c: string) {
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
