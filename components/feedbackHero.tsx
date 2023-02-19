import React from "react";
import {
  useColorModeValue,
  Box,
  Icon,
  chakra,
  Text,
  Image,
} from "@chakra-ui/react";

export default function feedbackHero() {
  const bg = useColorModeValue("brand.500", "gray.800");
  return (
    <>
      <Box pos="relative" overflow="hidden" bg={bg}>
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{
              base: 8,
              sm: 16,
              md: 20,
              lg: 28,
              xl: 32,
            }}
            maxW={{
              lg: "2xl",
            }}
            w={{
              lg: "full",
            }}
            zIndex={1}
            bg={bg}
            border="solid 1px transparent"
          >
            <Icon
              display={{
                base: "none",
                lg: "block",
              }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={bg}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </Icon>
            <Box
              mx="auto"
              maxW={{
                base: "7xl",
              }}
              px={{
                base: 4,
                sm: 6,
                lg: 8,
              }}
              mt={{
                base: 10,
                sm: 12,
                md: 16,
                lg: 20,
                xl: 28,
              }}
            >
              <Box
                w="full"
                textAlign={{
                  sm: "center",
                  lg: "left",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{
                    base: "4xl",
                    sm: "5xl",
                    md: "6xl",
                  }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color={"brand.900"}
                >
                  <chakra.span
                    display={{
                      base: "block",
                      xl: "inline",
                    }}
                  >
                    Resume
                  </chakra.span>
                  <chakra.span
                    display={{
                      base: "block",
                      xl: "inline",
                    }}
                  >
                    {" "}
                    Feedback
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{
                    base: 3,
                    sm: 5,
                    md: 5,
                  }}
                  fontSize={{
                    sm: "lg",
                    md: "xl",
                  }}
                  maxW={{
                    sm: "xl",
                  }}
                  mx={{
                    sm: "auto",
                    lg: 0,
                  }}
                  color="gray.500"
                >
                  Leverage the power of our cutting-edge Natural Language
                  Processing model to elevate your resume and make it stand out
                  from the crowd..Secure interviews at the most prestigious
                  companies with a resume that leaves a lasting impression.
                </chakra.p>
                <Box
                  mt={{
                    base: 5,
                    sm: 8,
                  }}
                  display={{
                    sm: "flex",
                  }}
                  justifyContent={{
                    sm: "center",
                    lg: "start",
                  }}
                  fontWeight="extrabold"
                  fontFamily="fantasy"
                >
                  <Box rounded="full" shadow="md">
                    <chakra.a
                   
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="solid 1px transparent"
                      fontSize={{
                        base: "md",
                        md: "lg",
                      }}
                      rounded="md"
                      color="white"
                      bg="brand.600"
                      _hover={{
                        bg: "brand.700",
                      }}
                      px={{
                        base: 8,
                        md: 10,
                      }}
                      py={{
                        base: 3,
                        md: 4,
                      }}
                      cursor="pointer"
                      transition="all .15s ease"
                    >
                      Get started
                    </chakra.a>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          position={{
            lg: "absolute",
          }}
          top={{
            lg: 0,
          }}
          bottom={{
            lg: 0,
          }}
          right={{
            lg: 0,
          }}
          w={{
            lg: "50%",
          }}
          border="solid 1px transparent"
        >
          <Image
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
            loading="lazy"
          />
        </Box>
      </Box>
    </>
  );
}
