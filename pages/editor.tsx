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

  const handleSaveAsPDF = () => {
    if (!previewRef.current) return;
    const pdf = new jsPDF();
    const previewElement = previewRef.current;
    pdf.html(previewElement.innerHTML, {
      callback: function () {
        pdf.save("resume.pdf");
      },
    });
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
            className="preview"
            ref={previewRef}
            dangerouslySetInnerHTML={getPreviewStyle()}
          />
          <div
            className="preview"
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
          <Button
            px="60px"
            mt="1rem"
            _hover={{
             
              backgroundColor: "brand.500",
            }}
            color="white"
            fontWeight={"300"}
            backgroundColor={"brand.700"}
          >
            Save as PDF
          </Button>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default ResumeGenerator;
