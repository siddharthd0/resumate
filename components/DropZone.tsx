import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./DropZone.module.css";
import { FiUpload } from "react-icons/fi";
import { storage, db } from "../firebase";
import { Icon } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";

const DropZone = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const uploadResume = async () => {
    if (!selectedFile) return;

    const docRef = await addDoc(collection(db, "resumes"), {
      username: usernameRef.current?.value || "",
      timestamp: serverTimestamp(),
    });
    const fileRef = ref(storage, `resumes/${docRef.id}/${selectedFile.name}`);
    await uploadBytes(fileRef, selectedFile);
    const downloadURL = await getDownloadURL(fileRef);
    await updateDoc(doc(db, "resumes", docRef.id), {
      file: downloadURL,
    });

    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    setSelectedFile(null);
    setErrorMessage("");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        {selectedFile ? (
          <div className="preview">
            <Icon as={FiUpload} w={20} h={20} />
            <div className="file-info">
              <div className="file-name">{selectedFile.name}</div>
            </div>
          </div>
        ) : (
          <>
            <Icon as={FiUpload} w={10} h={10} />
          </>
        )}
      </div>
      <input ref={usernameRef} type="text" placeholder="add your name" />
      <button onClick={uploadResume}>Upload</button>
    </>
  );
};

export default DropZone;
