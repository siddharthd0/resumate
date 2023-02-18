import React, { useState, useEffect } from "react";
import { marked } from "marked";
import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState("# Heading\n\nSome text");
  const [css, setCss] = useState("h1 { color: red; }");
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [preview, setPreview] = useState("");

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

  return (
    <>
      <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <Flex margin={"5rem auto"} maxW={"1000px"}>
        <Tabs maxW={"400px"} variant="enclosed">
          <TabList>
            <Tab>Markdown Editor</Tab>
            <Tab>CSS Editor (Styling)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="editor">
                <h2>Markdown Editor</h2>
                <textarea
                  value={markdown}
                  onChange={handleMarkdownChange}
                ></textarea>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="editor">
                <h2>CSS Editor</h2>
                <textarea value={css} onChange={handleCssChange}></textarea>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="preview" dangerouslySetInnerHTML={getPreviewStyle()} />
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: preview }}
        ></div>
      </Flex>
    </>
  );
};

export default ResumeGenerator;
