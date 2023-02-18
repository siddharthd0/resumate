import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

function UploadResume(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);

  const handleFileDrop = (acceptedFiles: File[]): void => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //accept: "application/pdf",
    maxFiles: 1,
    onDrop: handleFileDrop
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file, file.name);
    console.log(formData);

    try {
      const response = await fetch("/api/uploadResume", {
        method: "POST",
        body: formData
      });
      console.log(response);
      // handle the response from the server
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF file here ...</p>
        ) : (
          <p>Drag and drop a PDF file here, or click to select a PDF file</p>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadResume;
