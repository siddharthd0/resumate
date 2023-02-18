import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Textarea,
  Button,
  Container,
  VStack,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import breaks from "remark-breaks";
import emoji from "remark-emoji";
import footnotes from "remark-footnotes";
import math from "remark-math";
import slug from "remark-slug";
import toc from "remark-toc";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import React from "react";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [markdown, setMarkdown] = useState(`# Markdown Example

  This is an example of a **Markdown** document that you can edit in this editor. It supports all the common Markdown elements, such as:
  
  ## Headings
  
  You can create headings using the \`#\` character:
  
  # Heading 1
  ## Heading 2
  ### Heading 3
  
  ## Emphasis
  
  You can add emphasis to text using \`*\` or \`_\` characters:
  
  *This text will be italic*
  _This text will also be italic_
  
  **This text will be bold**
  __This text will also be bold__
  
  ## Lists
  
  You can create ordered and unordered lists:
  
  ### Unordered List
  - Item 1
  - Item 2
  - Item 3
  
  ### Ordered List
  1. Item 1
  2. Item 2
  3. Item 3
  
  ## Links
  
  You can create links like this: [Google](https://www.google.com).
  
  ## Images
  
  You can add images like this:
  
  ![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
  
  ## Code
  
  You can create inline code using \`code\` and code blocks using triple backticks:
  
  \`\`\`javascript
  console.log("Hello, world!");
  \`\`\`
  
  ## Tables
  
  You can create tables like this:
  
  | Name   | Age | Gender |
  | ------ | --- | ------ |
  | Alice  | 25  | Female |
  | Bob    | 30  | Male   |
  | Carol  | 35  | Female |
  
  ## Horizontal Rules
  
  You can create horizontal rules using three or more hyphens, asterisks, or underscores:
  
  ---
  
  * * *
  
  ___
  `);

  const [css, setCss] = useState(`.markdown-preview {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .markdown-preview h1, .markdown-preview h2, .markdown-preview h3 {
    color: #0078D4;
  }`);

  return (
    <>
      <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <Flex flexDirection="column" minHeight="100vh">
        <Box bg="gray.100" flex="1">
          <Container maxW="container.lg" py="10">
            <Text fontSize="4xl" fontWeight="bold" mb="4">
              Markdown Editor
            </Text>
            <VStack spacing="4">
              <Textarea
                value={markdown}
                onChange={(event) => setMarkdown(event.target.value)}
                placeholder="Enter markdown here"
                size="lg"
                height="400px"
              />
              <Button onClick={() => setMarkdown("# New document")}>
                New Document
              </Button>
            </VStack>
          </Container>
        </Box>
        <Box bg="white" p="4" flex="1">
          <Container maxW="container.lg" h="100%">
            <Box
              css={css}
              border="1px solid"
              borderColor="gray.200"
              p="4"
              h="100%"
              overflowY="auto"
            >
              <ReactMarkdown
                plugins={[gfm, breaks, emoji, footnotes, math, slug, toc]}
              >
                {markdown}
              </ReactMarkdown>
            </Box>
          </Container>
        </Box>
        <Box bg="gray.100" p="4">
          <Container maxW="container.lg">
            <VStack spacing="4">
              <Textarea
                value={css}
                onChange={(event) => setCss(event.target.value)}
                placeholder="Enter CSS here"
                size="lg"
                height="200px"
              />
              <Text fontSize="lg" fontWeight="bold">
                Preview Style:
              </Text>
              <Box
                css={css}
                border="1px solid"
                borderColor="gray.200"
                p="4"
                h="100px"
                overflowY="auto"
              >
                <p>This is a preview of the CSS you entered.</p>
                <p>You can use it to style the Markdown preview above.</p>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
