import "../styles/globals.css";
import "../styles/generate.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#94a3b8",
    800: "#fff",
    700: "#172032",
    600: "#0f172a",
    500: "#0E294F"
  },
};

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "600"
      },

      sizes: {
        lg: {
          h: "56px",
          fontSize: "lg",
          px: "32px"
        }
      }
    }
  },

  colors
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
