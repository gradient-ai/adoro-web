import { Box, Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useCallback } from "react";

export default function TimeMachine() {
  const router = useRouter();

  const viewMeme = useCallback(() => {
    router.push("/flow/3-share-meme");
  }, [router]);

  return (
    <HStack>
      <Box>
        <Button colorScheme="yellow" variant="ghost" onClick={viewMeme}>
          Done Processing
        </Button>
      </Box>
    </HStack>
  );
}
