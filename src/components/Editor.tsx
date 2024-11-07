import AceEditor from "react-ace";
import { Editor as IAceEditor } from '@types/ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/ext-language_tools';  // This is necessary for enabling autocomplete
import 'ace-builds/src-noconflict/ext-beautify'; 


const Editor = ({ selectedLang,setCode }: { selectedLang: string, setCode: (value: string) => void }) => {
  function code(c: string) {
    console.log("code I have wrote",c);

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
  return (
    <div>
      {" "}
      <AceEditor
        mode={selectedLang}
        theme="monokai"
        width="100%"
        onChange={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height={"100vh"}
        fontSize={16}
        enableBasicAutocompletion={true}
        enableSnippets={true}
        enableLiveAutocompletion={true}
      
        onLoad={onLoad}
      />
    </div>
  );
};

export default Editor;
