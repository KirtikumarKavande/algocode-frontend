import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const Editor = ({ selectedLang }: { selectedLang: string }) => {
  function code(c: string) {
    console.log(c);
  }
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
        height="635px"
        fontSize={14}
      />
    </div>
  );
};

export default Editor;
