import Image from "next/image";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./DropZone.module.css";
import { FiUpload } from "react-icons/fi";
import { storage, db } from "../firebase";
import {
  Flex,
  Heading,
  Input,
  Button,
  Icon,
  chakra,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import FeedbackHero from "./feedbackHero";
import { BsArrowRightCircleFill } from "react-icons/bs";

const DropZone = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast({
          title: "Error",
          description: "Please upload only one PDF file.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (acceptedFiles[0].type !== "application/pdf") {
        toast({
          title: "Error",
          description: "Please upload a PDF file.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setSelectedFile(acceptedFiles[0]);
        console.log(acceptedFiles);
        toast({
          title: "Success",
          description: "File selected successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast]
  );

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
    toast({
      title: "Success",
      description: "Resume uploaded successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <FeedbackHero />
      <chakra.div
        py="2rem"
        px="3rem"
        my="3rem !important"
        borderRadius={"10px"}
        backgroundColor={"brand.700"}
        margin="auto"
        maxW={"1000px"}
      >
        <Heading color="white" fontSize={"lg"}>
          Get started
        </Heading>
        <Heading color="brand.800" fontSize="5xl !important">
          Upload your resume
        </Heading>
        <Flex maxW={"95%"} my="1rem" alignItems={"center"}>
          <chakra.div
            bgColor="brand.900"
            width={"400px"}
            {...getRootProps()}
            className={classes.dropzone}
          >
            <input {...getInputProps()} />

            {selectedFile ? (
              <div>
                <div>
                  <div className="file-name">{selectedFile.name}</div>
                </div>
              </div>
            ) : (
              <button onClick={uploadResume}>
                <div>
                  <Icon as={FiUpload} w={6} h={6} />
                </div>
              </button>
            )}
          </chakra.div>
          <Spacer />

          <Input
            color="white"
            py="1.5rem"
            maxW={"300px"}
            ref={usernameRef}
            type="text"
            placeholder="Please enter your name"
          />
          <Spacer />

          <Button
            py="25px"
            bgColor={"brand.600 !important"}
            _hover={{ color: "#08f26e" }}
            px="20px"
            color="white"
            fontWeight={"300"}
            borderRadius="7px"
            onClick={uploadResume}
            rightIcon={<Icon as={BsArrowRightCircleFill} w={6} h={6} />}
          >
            Upload
          </Button>
        </Flex>
      </chakra.div>
    </>
  );
};

export default DropZone;
