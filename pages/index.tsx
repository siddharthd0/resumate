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
  Spacer,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";



const Home: NextPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);

  return (
    <>
      <Navigation onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <Box  background={"https://static.vecteezy.com/system/resources/previews/010/825/735/non_2x/dark-background-random-minimalist-abstract-illustration-for-logo-card-banner-web-and-printing-free-vector.jpg"}>
        <Box  height={"100vh"} display={"flex"} justifyContent={"center"}>
          <Box
          pt="52"
            as={motion.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            
            px={{ base: "4", md: "20" }}
          >
            <Container maxW="900px">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Text
                  textAlign={"center"}
                  color="brand.900"
                  fontSize="xl"
                  maxW="2xl"
                  mb="28px"
                >
                  A simple and easy-to-use tool for creating and editing
                  resumes.
                </Text>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Flex justifyContent={"center"}>
                  <Button
                    px="20px"
                    mt="1rem"
                    _hover={{
                      color: "brand.800",
                    }}
                    color="brand.800"
                    fontWeight={"300"}
                    backgroundColor={"brand.700"}
                  >
                    Build your Resume now
                  </Button>
                </Flex>
              </motion.div>
            </Container>
          </Box>
        </Box>
        <Box as="section" py="250px">
          <Container maxW="800px">
            <Stack direction={{ base: "column", lg: "column" }} spacing={16}>
              <Flex alignItems={"center"} data-aos="fade-right" data-aos-duration="700" >
                <Image
                  height="300px"
                  maxWidth="400px"
                  borderRadius="lg"
                  src="https://source.unsplash.com/featured/?workplace"
                  alt="workplace"
                  mb="8"
                />
                
                <Flex ml={["0rem", "3rem"]} direction={"column"}>
                <Heading color={"brand.900"} as="h2" size="xl" mb="4">
                  Effortless Resume Creation
                </Heading>
                <Text color={"brand.900"} fontSize="md" mb="6">
                  Our resume builder makes it easy to create a professional
                  resume in minutes. Simply choose from one of our templates and
                  customize the content to your liking. Using Markdown, you can
                  modify it however you wish.
                </Text>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} data-aos="fade-right" data-aos-duration="700" >
              
                
                <Flex mr={["0rem", "3rem"]} direction={"column"}>
                <Heading color={"brand.900"} as="h2" size="xl" mb="4">
                  Effortless Resume Creation
                </Heading>
                <Text color={"brand.900"} fontSize="md" mb="6">
                  Our resume builder makes it easy to create a professional
                  resume in minutes. Simply choose from one of our templates and
                  customize the content to your liking. Using Markdown, you can
                  modify it however you wish.
                </Text>
                </Flex>
                <Image
                  height="300px"
                  maxWidth="400px"
                  borderRadius="lg"
                  src="https://source.unsplash.com/featured/?computer"
                  alt="workplace"
                  mb="8"
                />
              </Flex>
           
            </Stack>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
