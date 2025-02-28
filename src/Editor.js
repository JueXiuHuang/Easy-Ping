import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

export default function CodeEditor() {
  const [code, setCode] = React.useState("");
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Consolas", "Fira Mono", monospace',
        fontSize: 16,
      }}
    />
  );
}