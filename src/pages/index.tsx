/* eslint-disable no-debugger */
import { Box, HStack, IconButton, Image, VStack } from "@chakra-ui/react"
import { useBoolean } from "ahooks"
import HeadOutline from "assets/head-outline"
import { useRouter } from "next/router"
import React, { useCallback, useRef, useState } from "react"
import { RiCameraLine, RiSkipBackFill, RiVideoUploadFill } from "react-icons/ri"
import Webcam from "react-webcam"
import { API } from "services/api"

const useCamera = () => {
  const [isCameraOnline, { setTrue: setCameraOnline }] = useBoolean(false)
  const [isCameraError, { setTrue: setCameraError }] = useBoolean(false)
  const [image, setImage] = useState("")
  const reset = useCallback(() => setImage(""), [setImage])

  const ref = useRef<Webcam>(null)
  const capture = useCallback(() => {
    setImage(ref.current?.getScreenshot() ?? "")
  }, [ref, setImage])

  return {
    ref,
    image,
    reset,
    capture,
    isCameraError,
    isCameraOnline,
    setCameraOnline,
    setCameraError,
  }
}

export default function PhotoBooth({ size = 256 }) {
  const { ref, image, reset, capture, setCameraError, setCameraOnline } =
    useCamera()

  const router = useRouter()
  const initiateTimeMachine = useCallback(async () => {
    const { data: params } = await API.post("/adoro", { image })
    console.log(params)
    router.push({
      pathname: "/time-machine",
      query: params,
    })
  }, [router, image])

  return (
    <>
      <Box>
        <Image src="/adoro-logo.png" alt="adoro logo" w="100%" padding="0 0 2em 0"/>
      </Box>
      <VStack
        alignItems="stretch"
        spacing={3}
        p={3}
        bg="white"
        rounded="md"
        boxShadow="md"
      >
        <Box w={size} h={size} rounded="lg" overflow="hidden">
          {image && (
            <Image
              src={image}
              htmlHeight={size}
              htmlWidth={size}
              alt="Your beautiful face"
            />
          )}
          <Box pos="relative" float="left">
            <Webcam
              style={{ display: image ? "none" : "block" }}
              mirrored
              height={size}
              width={size}
              videoConstraints={{ facingMode: "user", width: size, height: size }}
              ref={ref}
              screenshotQuality={1}
              screenshotFormat="image/png"
              onUserMedia={setCameraOnline}
              onUserMediaError={setCameraError}
            />
            <Box pos="absolute" top="0" right="0" bottom="0" left="0">
              <HeadOutline />
            </Box>
          </Box>
        </Box>
        {image ? (
          <HStack>
            <IconButton
              p={4}
              size="xl"
              rounded="lg"
              fontSize="2rem"
              variant="outline"
              colorScheme="turqoise"
              onClick={reset}
              aria-label="Retake photo"
              icon={<RiSkipBackFill />}
            />
            <IconButton
              p={4}
              flex={1}
              size="xl"
              icon={<RiVideoUploadFill />}
              colorScheme="green"
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
            colorScheme="blue"
            variant="solid"
            rounded="lg"
            fontSize="2rem"
            onClick={capture}
            aria-label="Take photo"
            icon={<RiCameraLine />}
          />
        )}
      </VStack>
      <div>
        Powered by <a href="https://gradient.run" target="_blank" rel="noreferrer" style={{fontWeight: 600}}>Gradient</a>
      </div>
    </>
  )
}
