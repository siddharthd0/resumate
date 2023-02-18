import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Text, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Footer = () => {

  return (
    <Box id="footer" backgroundColor="brand.700" color="brand.900">
      <Container maxW="6xl" py="12">
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Box flex="1">
            <Text fontWeight="bold">Resume Builder</Text>
            <Text fontSize="sm" mt="4">
              A simple and easy-to-use tool for creating and editing resumes.
            </Text>
          </Box>
          <Box flex="1">
            <Text fontWeight="bold" mb="4">
              Links
            </Text>
            <Stack spacing={2}>
              <Link href="/">Home</Link>
              <Link href="/feedback">Resume Feedback</Link>
              <Link href="/editor">Resume Editor</Link>
            </Stack>
          </Box>
        </Stack>
      </Container>

 
    </Box>
  );
};

export default Footer;