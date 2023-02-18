import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./DropZone.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const DropZone = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      setErrorMessage("Please upload only one PDF file.");
    } else if (acceptedFiles[0].type !== "application/pdf") {
      setErrorMessage("Please upload a PDF file.");
    } else {
      setSelectedFile(acceptedFiles[0]);
      console.log(acceptedFiles);
      setErrorMessage("");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        {selectedFile ? (
          <div className="preview">
            <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
            <div className="file-info">
              <div className="file-name">{selectedFile.name}</div>
            </div>
          </div>
        ) : (
          <p>Drag and drop a PDF file here, or click to select a file</p>
        )}
      </div>
    </>
  );
};

export default DropZone;
