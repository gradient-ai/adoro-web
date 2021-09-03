import "styles/globals.css";

import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Flex w="100vw" h="100vh" bg="yellow.200">
        <Container centerContent py={8}>
          <Component {...pageProps} />
        </Container>
      </Flex>
    </ChakraProvider>
  );
}
