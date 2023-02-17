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
    <Flex align="center" justify="space-between" wrap="wrap" padding={6}>
      <Box mt="10px">
        <Heading size="lg">Resume Builder</Heading>
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
        mt="-14px"
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