import React, { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import DropZone from "../components/DropZone";

function UploadResume(): JSX.Element {
  return (
    <div>
      <DropZone />
    </div>
  );
}

export default UploadResume;
