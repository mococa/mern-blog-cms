// import react, react-markdown-editor-lite, and a markdown parser you like
import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export const Editor = ({ onChange }) => {
  return (
    <MdEditor
      style={{ height: "500px", margin: 8 }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
    />
  );
};
export default Editor;
