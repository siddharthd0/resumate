import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Heading,
  Box,
  Button,
  Container,
  Text,
  Flex,
  Stack,
  Image,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import React from "react";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <Box backgroundColor={"brand.600"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Box as="section" pt="40" pb="24" px={{ base: "4", md: "20" }}>
            <Container maxW="900px">
              <Heading
                mb="16px"
                as="h1"
                fontSize="6xl"
                color="brand.900"
                textAlign="center"
                textShadow="1px 1px 2px rgba(0,0,0,0.3)"
              >
                Create your perfect resume
              </Heading>

              <Text
                textAlign={"center"}
                color="brand.900"
                fontSize="xl"
                maxW="2xl"
                mb="28px"
              >
                A simple and easy-to-use tool for creating and editing resumes.
              </Text>
              <Flex justifyContent={"center"}>
                <Button
                  px="20px"
                  mt="1rem"
                  _hover={{
                    color: "brand.800",
                  }}
                  color="brand.900"
                  fontWeight={"300"}
                  backgroundColor={"brand.700"}
                >
                  Build your Resume now
                </Button>
              </Flex>
            </Container>
          </Box>
        </Box>
        <Box as="section" py="24">
          <Container maxW="500px">
            <Stack direction={{ base: "column", lg: "column" }} spacing={16}>
              <Box flex="1">
                <Image
                  height="300px"
                  width="500px"
                  borderRadius="lg"
                  src="https://source.unsplash.com/featured/?workplace"
                  alt="workplace"
                  mb="8"
                />
                <Heading color={"brand.900"} as="h2" size="xl" mb="4">
                  Effortless Resume Creation
                </Heading>
                <Text color={"brand.900"} fontSize="lg" mb="6">
                  Our resume builder makes it easy to create a professional
                  resume in minutes. Simply choose from one of our templates and
                  customize the content to your liking. Using Markdown, you can modify it however you wish.
                </Text>
              </Box>
              <Box flex="1">
                <Image
                  height="300px"
                  width="500px"
                  borderRadius="lg"
                  src="https://source.unsplash.com/featured/?computer"
                  alt="computer"
                  mb="8"
                />
                <Heading color={"brand.900"} as="h2" size="xl" mb="4">
                  Powerful Editing Tools
                </Heading>
                <Text color={"brand.900"} fontSize="lg" mb="6">
                  Our editing tools make it easy to customize your resume to
                  your liking. You can add, remove, and rearrange sections,
                  change the colors and fonts, and much more.
                </Text>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
