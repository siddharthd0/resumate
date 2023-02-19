import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  chakra,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import Footer from "../components/footer";

export default function ResumeGenerator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const previewRef = useRef(null);

  useEffect(() => {
    const generatePreview = async () => {
      const canvas = await html2canvas(previewRef.current!);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    generatePreview();
  }, [name, email, phone, education, experience, skills]);

  const downloadPdf = () => {
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(previewUrl, "PNG", 0, 0, pdfWidth, pdfHeight, '', 'FAST', 0, 300);
    pdf.save("resume.pdf");
  };

  return (
    <>
      <Heading
        mb="19px !important"
        color="brand.900"
        fontSize={"5xl !important"}
        textAlign={"center"}
        margin={"auto"}
        mt="38px"
      >
        Resume Generator
      </Heading>
      <chakra.div mb="50px" maxW={"1000px"} margin="auto" display={"flex"}>
        <chakra.div color="whiteAlpha.700">
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone:</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Education:</FormLabel>
            <Input
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Experience:</FormLabel>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Skills:</FormLabel>
            <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </FormControl>
          <Button
            px="20px"
            mt="1rem"
            onClick={downloadPdf}
            _hover={{
              backgroundColor: "brand.500",
            }}
            color="white"
           

            fontWeight={"300"}
            backgroundColor={"brand.700"}
          >
            Download PDF
          </Button>
        </chakra.div>
        <Spacer />
        <chakra.div
          mb="50px"
          padding="1rem"
          height="1056px"
          borderRadius={"6px"}
          backgroundColor={"brand.800"}
          width={"816px"}
          ref={previewRef}
        >
          <Heading color="#3d7be0" fontSize="5xl">
            {name}
          </Heading>
          <Flex mb="8px">
            <Text color="black" textDecoration={"underline"} fontSize="sm">
              {" "}
              {email}
            </Text>
            <Spacer />
            <Text color="black" textDecoration={"underline"} fontSize="sm">
              {" "}
              {phone}
            </Text>
          </Flex>
          <Divider bgColor="black" height={"1px"} fontWeight={"black"} />
          <Heading color="black" mt="10px" fontSize="3xl">
            Education
          </Heading>
          <Text color="black">{education}</Text>
          <Heading color="black" mt="10px" fontSize="3xl">
            Experience
          </Heading>
          <Text color="black">{experience}</Text>
          <Heading color="black" mt="10px" fontSize="3xl">
            Skills
          </Heading>
          <Text color="black">{skills}</Text>
        </chakra.div>
      </chakra.div>

      <Footer />
    </>
  );
}
