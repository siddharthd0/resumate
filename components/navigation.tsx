import React from "react";
import { Flex, Box, Spacer, Heading, Link, IconButton } from "@chakra-ui/react";
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
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, delay: 1.6 } },
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
      px="60px"
      py="18px"
      color="brand.800"
      backgroundColor={"transparent"}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Box display={"flex"} alignItems={"center !important"}>
        <Heading className="logo" fontSize="2xl">
          Resumate
        </Heading>
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
          color="brand.800"
          href="/"
          mx={5}
        >
          Home
        </Link>
        <Link
          _hover={{
            color: "brand.800",
          }}
          color="brand.800"
          href="/feedback"
          mx={5}
        >
          Resume Feedback
        </Link>
        <Link
          _hover={{
            color: "brand.800",
          }}
          color="brand.800"
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