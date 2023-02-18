import React, { useState, useEffect } from "react";
import {marked} from "marked";

const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState("# Heading\n\nSome text");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview(marked(markdown));
  }, [markdown]);

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <div className="editor">
        <h2>Markdown Editor</h2>
        <textarea value={markdown} onChange={handleMarkdownChange}></textarea>
      </div>
      <div className="preview" dangerouslySetInnerHTML={{ __html: preview }}></div>

    </div>
  );
};

export default ResumeGenerator;
