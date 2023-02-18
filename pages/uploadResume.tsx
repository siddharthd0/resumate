import React, { useState } from "react";

function UploadResume(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

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
      <label>
        Upload your resume:
        <input name="resume" type="file" onChange={handleFileUpload} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UploadResume;
