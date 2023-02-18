import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#02C39A", //paragraphs
    800: "#00A896", //navbar
    700: "#00A896", //header & bg of course box
    600: "#181823", //dark background color
  },
};

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "600",
      },

      sizes: {
        lg: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
    },
  },

  colors,
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
