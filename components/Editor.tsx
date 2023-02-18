import { useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "../node_modules/codemirror/lib/codemirror.css";

import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
import "codemirror/addon/hint/css-hint";


const Editor = () => {
  const [value, setValue] = useState<string>("h1 { color: red }");

  return (
    <CodeMirror
      value={value}
      options={{
        mode: "css",
        theme: "material",
        lineNumbers: true,
        hintOptions: {
          completeSingle: false,
        },
      }}
      onChange={(editor, data, value) => {
        setValue(value);
      }}
    />
  );
};

export default Editor;
