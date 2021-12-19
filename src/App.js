// import react, react-markdown-editor-lite, and a markdown parser you like
import React, { useState } from "react";
import AuthAndGo from "./components/AuthAndGo";
import Editor from "./components/Editor";
import AppCSS from "./styles/App.css";
const App = () => {
  const [markdown, setMarkdown] = useState("");
  const clearMarkdown = () => {
    document.querySelector(".input").value = "";
    document.querySelector(
      "#root > div > div.editor-container > section.section.sec-html.visible > div"
    ).value = "";
    setMarkdown("");
  };
  return (
    <>
      <Editor onChange={({ text }) => setMarkdown(text)} />
      <AuthAndGo markdown={markdown} clearMarkdown={clearMarkdown} />
    </>
  );
};
export default App;
