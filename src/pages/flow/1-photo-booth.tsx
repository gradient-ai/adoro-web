import { Box, HStack, IconButton, Image, VStack } from "@chakra-ui/react";
import { useBoolean } from "ahooks";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import {
  RiCameraLine,
  RiSkipBackFill,
  RiVideoUploadFill
} from "react-icons/ri";
import Webcam from "react-webcam";

export default function PhotoBooth({ size = 256 }) {
  const webcam = useRef<Webcam>(null);

  const router = useRouter();

  const initiateTimeMachine = useCallback(() => {
    router.push("/flow/2-time-machine");
  }, [router]);

  const [image, setImage] = useState("");
  const [isCameraOnline, { setTrue: setCameraOnline }] = useBoolean(false);
  const [isCameraError, { setTrue: setCameraError }] = useBoolean(false);

  const capture = useCallback(() => {
    setImage(webcam.current?.getScreenshot() ?? "");
  }, [webcam, setImage]);

  const reset = useCallback(() => setImage(""), [setImage]);

  return (
    <VStack
      alignItems="stretch"
      spacing={3}
      p={3}
      bg="white"
      rounded="md"
      boxShadow="md"
    >
      <Box w={size} h={size} rounded="lg" overflow="hidden">
        {image && <Image src={image} htmlHeight={size} htmlWidth={size} />}
        <Webcam
          style={{ display: image ? "none" : "block" }}
          mirrored
          height={size}
          width={size}
          videoConstraints={{ facingMode: "user", width: size, height: size }}
          ref={webcam}
          screenshotQuality={1}
          screenshotFormat="image/png"
          onUserMedia={setCameraOnline}
          onUserMediaError={setCameraError}
        />
      </Box>
      {image ? (
        <HStack>
          <IconButton
            p={4}
            size="xl"
            rounded="lg"
            fontSize="2rem"
            variant="outline"
            onClick={reset}
            aria-label="Retake photo"
            icon={<RiSkipBackFill />}
          />
          <IconButton
            p={4}
            flex={1}
            size="xl"
            icon={<RiVideoUploadFill />}
            colorScheme="yellow"
            color="white"
            rounded="lg"
            fontSize="2rem"
            aria-label="Sing!"
            onClick={initiateTimeMachine}
          />
        </HStack>
      ) : (
        <IconButton
          flex={1}
          p={4}
          size="xl"
          color="white"
          colorScheme="yellow"
          variant="solid"
          rounded="lg"
          fontSize="2rem"
          onClick={capture}
          aria-label="Take photo"
          icon={<RiCameraLine />}
        />
      )}
    </VStack>
  );
}
