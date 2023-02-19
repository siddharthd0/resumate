import React from "react";
import {
  Image,
  Flex,
  Box,
  Spacer,
  Heading,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
interface NavigationProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onOpen, onClose, isOpen }) => {
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, delay: 2 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  return (
    <Flex
      as={motion.nav}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      alignItems={"center !important"}
      px="110px"
      py="14px"
      color="brand.900"
      backgroundColor={"brand.700"}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Box py="10px" maxW={"300px"} mt="-40px" mb="-50px" display={"flex"} alignItems={"center !important"}>
        <Image src="/Resu2.png" alt="logo" />
      </Box>
      <Spacer />
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          aria-label={isOpen ? "Close menu" : "Open menu"}
          size="lg"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
        />
      </Box>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        <Link
          _hover={{
            color: "brand.800",
          }}
          color="brand.900"
          href="/"
          mx={5}
        >
          Home
        </Link>
        <Link
          _hover={{
            color: "brand.800",
          }}
          color="brand.900"
          href="/feedback"
          mx={5}
        >
          Resume Feedback
        </Link>
        <Link
          _hover={{
            color: "brand.800",
          }}
          color="brand.900"
          href="/editor"
          mx={5}
        >
          Resume Editor
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
