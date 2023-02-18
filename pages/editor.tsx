import React, { useState, useEffect } from "react";
import {marked} from "marked";

const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState("# Heading\n\nSome text");
  const [css, setCss] = useState("h1 { color: red; }");

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview(marked(markdown));
  }, [markdown]);

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const handleCssChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCss(event.target.value);
  };

  const getPreviewStyle = () => {
    return { __html: `<style>${css}</style>` };
  };

  return (
    <div>
      <div className="editor">
        <h2>Markdown Editor</h2>
        <textarea value={markdown} onChange={handleMarkdownChange}></textarea>
      </div>
      <div className="editor">
        <h2>CSS Editor</h2>
        <textarea value={css} onChange={handleCssChange}></textarea>
      </div>
      <div className="preview" dangerouslySetInnerHTML={getPreviewStyle()} />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: preview }}
      ></div>
    </div>
  );
};

export default ResumeGenerator;
