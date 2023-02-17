import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Heading } from "@chakra-ui/react";
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
      <Footer />
    </>
  );
};

export default Home;
