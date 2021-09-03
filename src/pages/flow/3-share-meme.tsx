import {
  Button,
  HStack,
  Heading,
  Image,
  Portal,
  VStack
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Confetti from "react-confetti";
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiWhatsappFill
} from "react-icons/ri";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import useWindowSize from "react-use/lib/useWindowSize";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const adoroURL =
    context.query["adoroURL"] ||
    "https://c.tenor.com/bP3s681LnfUAAAAd/wombo.gif";

  return {
    props: {
      adoroURL
    }
  };
}

export default function ShareMeme({ adoroURL }: { adoroURL: string }) {
  const shareUrl = adoroURL;

  const { width, height } = useWindowSize();

  return (
    <>
      <Portal>
        <Confetti width={width} height={height} />
      </Portal>
      <VStack>
        <VStack bg="white" rounded="xl" w="md" py={6} spacing={3}>
          <Heading>Wow!</Heading>
          <Heading fontWeight={400} fontSize="lg">
            Share your moves, you crazy animal.
          </Heading>

          <Image
            alt="Did you ever think you would do this?"
            rounded="lg"
            w={256}
            h={256}
            src={adoroURL}
          />
        </VStack>

        <HStack spacing={2}>
          <TwitterShareButton url={shareUrl}>
            <Button colorScheme="twitter">
              <RiTwitterFill style={{ marginRight: 8 }} />
              Twitter
            </Button>
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl}>
            <Button colorScheme="facebook">
              <RiFacebookBoxFill style={{ marginRight: 8 }} />
              Facebook
            </Button>
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl}>
            <Button colorScheme="whatsapp">
              <RiWhatsappFill style={{ marginRight: 8 }} />
              WhatsApp
            </Button>
          </WhatsappShareButton>
        </HStack>
      </VStack>
    </>
  );
}
