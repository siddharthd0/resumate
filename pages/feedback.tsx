import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import DropZone from "../components/DropZone";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

function UploadResume(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <div>
        <DropZone />
      </div>
      <Footer />
    </>
  );
}

export default UploadResume;
