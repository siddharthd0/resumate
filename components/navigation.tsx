import React from "react";
import { Flex, Box, Spacer, Heading, Link, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

interface NavigationProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onOpen, onClose, isOpen }) => {
  return (
    <Flex
      alignItems={"center !important"}
      px="30px"
      py="14px"
      color="brand.900"
      backgroundColor={"brand.700"}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Box display={"flex"} alignItems={"center !important"}>
        <Heading fontSize="2xl">Resume Builder</Heading>
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
        <Link href="#" mx={5}>
          Home
        </Link>
        <Link href="#" mx={5}>
          Resume Feedback
        </Link>
        <Link href="#" mx={5}>
          Resume Editor
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
