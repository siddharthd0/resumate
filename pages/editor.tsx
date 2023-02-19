import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  chakra,
  Tab,
  TabPanel,
  Input,
  Spacer,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState(`<div class="body-container"> 

# John Doe


<div class="section headerInfo">

- johndoe@gmail.com
- 123-456-5678
- siddharthduggal.com

</div>

## Experience
### Full Stack Developer, XYZ Corp. <span class="spacer"></span> Jun 2018 &mdash; Dec 2019
-  Designed and implemented a responsive web application using React, Node.js, and MySQL.
- Collaborated with UX designers to create wireframes and mockups for the application's user interface.
- Implemented REST APIs to communicate with the application's back-end, enabling users to perform CRUD operations.
- Deployed the application to production servers using Docker containers and Kubernetes clusters."
- Conducted code reviews and provided feedback to team members, fostering a culture of continuous improvement.
- Worked with a team of 5 developers to deliver a high-quality product within a 3-month deadline.



### Playground Creator, FunWorld <span class="spacer"></span> Jul 2005 &mdash; Dec 2018

- Creating a cool new slide for the play area
- Developing an interactive game that kids love to play
- Launching a bouncy castle that was a hit with children and parents alike, attracting over 50,000 visitors in its first week
- Sharing my knowledge with other Playground Creators and helping them improve their skills in designing and building exciting features for our visitors.



### Music Experience Creator, BeatMaster <span class="spacer"></span> Feb 2019 &mdash; Jun 2021

- Crafting a delightful front-end user interface for our Year-In-Review feature, allowing users to reflect on their musical journey over the past year.
- Developing a powerful backend API for Playlist Radio that connects listeners with an endless stream of personalized music based on their preferences.
- Designing and implementing a sophisticated machine learning model to curate the perfect Discover Weekly playlists, helping our users discover new and exciting music every week.






## Education

### University of Markdown, CS Major <span class="spacer"></span> 2014 &mdash; 2018

- 4.0 GPA
- Dean's List
- Graduated with Honors

## Current Projects


- Natureael
  - Developed a mobile app that helps users track their water intake and reminds them to stay hydrated throughout the day.
- UltimateChatBot
  - Developed a chatbot for a customer service department, reducing response time and improving customer satisfaction.

## Skills

- Programming languages (Java, Python, C++, JavaScript)
- Web development (HTML, CSS, JavaScript)
- Database management (MongoDB, SQL, NoSQL)
- Cloud computing (AWS, Azure, Google Cloud)
- Languages (English, Spanish, French)



## Achievements

- Employee of the Year for outstanding performance and contributions to the company's success.
- Excellence in Customer Service Award for consistently providing exceptional service and support to customers.
- Innovator of the Year for developing and implementing a groundbreaking new technology.
- Rising Star Award for demonstrating exceptional potential and achievements early in one's career.
</div>
<div style="color: white;">
##### Hello User! Welcome to Resume's resume maker. This text is needed to function. Please do not remove this text, otherwise, it will not render the PDF correctly. Thank you for understanding! Enjoy using our Resume Maker!
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
</div>
  
  
  `);
  const [css, setCss] = useState(`

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap');

/* meta */
body {
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size:  14px
}

.spacer {
    margin: 0px auto;
}

/* ordering of content */
h1 {
    order: 0;
    color: #0077be !important;
}

.headerInfo {
    order: 1;
}

/* styling content */

.body-container {
  padding: 3rem;
  }


h3 {
    margin: 6px 0px;
}

h1 {
    color: black;
    text-transform: uppercase;
    text-align: center;
    font-size: 24px;
    margin: 0;
    padding: 0;
}

h2 {
    border-bottom: 1px solid #000000;
    text-transform: uppercase;
    font-size: 16px;
    padding: 0;
    color: #0077be !important;
}

h3 {
    display: flex;
    font-size: 15px;
    padding: 0;
    justify-content: space-between;
}
h4 {
    font-size: 14px;
    padding: 0;
    margin: 0;
    justify-content: space-between;
}

p {
    margin: 0;
    padding: 0;
}

a {
    color: black;
}

ul {
    margin: 4px 0;
    padding-left: 24px;
    padding-right: 24px;
}

/* header info content */
.headerInfo > ul {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 6px auto 0px !important;
    padding: 0;
}

.headerInfo > ul > li {
    display: inline;
    white-space: pre;
    list-style-type: none;
}

.headerInfo > ul >li:not(:last-child) {
    margin-right: 8px;
}

.headerInfo > ul > li:not(:last-child):after {
    content: "•";
    margin-left: 8px;
}
  
  `);
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

    html2canvas(previewRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // specify page size and orientation
      const width = pdf.internal.pageSize.getWidth(); // get page width
      const height = pdf.internal.pageSize.getHeight(); // get page height
      pdf.addImage(imgData, "PNG", 0, 0, width - 1, height, "", "FAST", 0); // add image to PDF
      //pdf.addImage(previewUrl, "PNG", 0, 0, pdfWidth, pdfHeight, '', 'FAST', 0, 300);
      pdf.save("resume.pdf");
      // const pdf = new jsPDF();
      //const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();
    });
  };

  return (
    <>
      <Box bgColor="brand.600">
        <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
        <Box mb="-2.5rem !important" mt="2rem !important" textAlign={"center"} margin="auto">
  <Text color="brand.900">(Check out this <Link isExternal href="https://www.markdownguide.org/cheat-sheet/" >Markdown Cheat Sheet</Link> for cool tips and tricks!)</Text>
</Box>

        <Flex margin={"0rem 5rem"} py="5rem">
          <Flex maxW="800px" direction="column">
            <Button
              onClick={handleSaveAsPDF}
              px="60px"
             
              _hover={{
                backgroundColor: "brand.500",
              }}
              color="white"
              fontWeight={"300"}
              backgroundColor={"brand.700"}
            >
              Save as PDF
            </Button>
            <Tabs mt="16px" isFitted variant="enclosed">
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
          </Flex>
          <Spacer />
          <chakra.div width={"700px"} height={""}>
            <div
              className="previewBox testingBox"
              ref={previewRef}
              dangerouslySetInnerHTML={getPreviewStyle()}
            />
            <div
              className="previewBox"
              ref={previewRef}
              dangerouslySetInnerHTML={{ __html: preview }}
            ></div>
          </chakra.div>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default ResumeGenerator;
