import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState("# Heading\n\nSome text");
  const [css, setCss] = useState("h1 { color: red; }");
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [preview, setPreview] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreview(marked(markdown));
  }, [markdown]);

  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdown(event.target.value);
  };

  const handleCssChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCss(event.target.value);
  };

  const getPreviewStyle = () => {
    return { __html: `<style>${css}</style>` };
  };

  // const handleSaveAsPDF = () => {
  //   if (!previewRef.current) return;
  //   const pdf = new jsPDF();
  //   const previewElement = previewRef.current;
  
  //   // Create a new element with the same content as the preview element
  //   const contentElement = document.createElement("div");
  //   contentElement.innerHTML = previewElement.innerHTML;
  
  //   // Apply the CSS styles to the new element
  //   const styleElement = document.createElement("style");
  //   styleElement.innerHTML = css;
  //   contentElement.prepend(styleElement);
  
  //   // Generate the PDF from the new element
  //   pdf.html(contentElement, {
  //     callback: function () {
  //       pdf.save("resume.pdf");
  //     },
  //   });
  // };
  const handleSaveAsPDF = () => {
    if (!previewRef.current) return;
    const previewElement = previewRef.current;

    // Create a new element with the same content as the preview element
    const contentElement = document.createElement("div");
    contentElement.innerHTML = previewElement.innerHTML;

    // Apply the CSS styles to the new element
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    contentElement.prepend(styleElement);

    // Generate the PDF from the new element using html2pdf
    const pdfOptions = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(pdfOptions).from(contentElement).save();
  };
  

  return (
    <>
      <Box bgColor="brand.600">
        <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
        <Flex margin={"0 auto"} py="5rem" maxW={"1000px"}>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab color="brand.900">Markdown Editor</Tab>
              <Tab color="brand.900">CSS Editor (Styling)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  <textarea
                    className="editorInput"
                    value={markdown}
                    onChange={handleMarkdownChange}
                  ></textarea>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <textarea
                    className="editorInput"
                    value={css}
                    onChange={handleCssChange}
                  ></textarea>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <div
            className="width1"
            ref={previewRef}
            dangerouslySetInnerHTML={getPreviewStyle()}
          />
          <div
            className="preview"
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
          <Button px="50px" onClick={handleSaveAsPDF}>
            Save as PDF
          </Button>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default ResumeGenerator;
