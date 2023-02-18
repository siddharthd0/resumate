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
// import jsPDF from "jspdf";
import {
  pdf,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

    const content = previewRef.current.innerHTML;

    // Define styles for the PDF document
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      text: {
        color: "black",
      },
    });

    // Define the document structure
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>{content}</Text>
          </View>
        </Page>
      </Document>
    );

    // Generate the PDF from the document
    pdf(<MyDocument />)
      .toBlob()
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
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
