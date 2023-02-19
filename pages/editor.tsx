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
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeGenerator = () => {
  const [markdown, setMarkdown] = useState(`<div class="body-container"> 

# {NAME}


<div class="section headerInfo">

- {EMAIL}
- {PHONE}
- [{WEBSITE}](https://{WEBSITE})
- {LOCATION}

</div>

## Experience
### Full Stack Developer, XYZ Corp. <span class="spacer"></span> Jun 2018 &mdash; Dec 2019
-  Designed and implemented a responsive web application using React, Node.js, and MySQL.
- Collaborated with UX designers to create wireframes and mockups for the application's user interface.
- Implemented REST APIs to communicate with the application's back-end, enabling users to perform CRUD operations.
- Deployed the application to production servers using Docker containers and Kubernetes clusters."
- Conducted code reviews and provided feedback to team members, fostering a culture of continuous improvement.
- Worked with a team of 5 developers to deliver a high-quality product within a 3-month deadline.



### Software Engineer, TikTok <span class="spacer"></span> Jul 2021 &mdash; Present

You can include a blurb here explaining a bit about what you worked

- Built out some feature on the For You Page
- Worked on a feature related to User Profiles
- Launched a feature that grew to 50M users in the first week
- Mentored peer engineers on front-end development and best practices

Technologies: React, Preact, Javascript, TypeScript, styled-components, Storybook, CSS, Sass, Jest

### Software Engineer, Spotify <span class="spacer"></span> Feb 2019 &mdash; Jun 2021

- Worked on the front-end experience for the Year-In-Review feature
- Implemented a backend API for Playlist Radio
- Built the ML model for Discover Weekly playlists

Technologies: React, NextJS, Javascript, styled-components, Golang, Docker, AWS, Chrome Extensions

### Software Engineer, Airbnb <span class="spacer"></span> Sept 2018 &mdash; Feb 2019

- Worked on a feature on the Hosts dashboard

<!-- Older resume bits can be commented out so that you can keep the info without deleting it -->

<!-- ### <span>Software Engineering Intern, Google</span> <span>Mar 2017 &mdash; Sept 2017</span>

### <span>Software Engineering Intern, Curalate</span> <span>June 2016 &mdash; Sept 2016</span> -->

## Education

### University Name, Major, Bachelors of Science <span class="spacer"></span> 2014 &mdash; 2018

- Include GPA if you like
- Teacher Assistant for 1 year (Intro to Programming and Client Side Web Development)
- Resident Advisor for 2 years

## Current Projects

### Tech Optimum

- B

## Skills

- Code: React + hooks, NextJS, Javascript, TypeScript, NodeJS, CSS, styled-components, Golang
- Tools: Docker, Redis, SQL, AWS, Puppeteer, Storybook, Jest, Shell, Tailwind

## Achievements

#### Best Undergrad Research Project <span class="spacer"></span> 2018

#### Eagle Scout <span class="spacer"></span> 2012

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
        <Flex margin={"2rem 5rem"} py="5rem">
          <Flex maxW="800px" direction="column">
            <Button
              onClick={handleSaveAsPDF}
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
          <Spacer/>
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
