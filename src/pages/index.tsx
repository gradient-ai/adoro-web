/* eslint-disable no-debugger */
import { Box, HStack, IconButton, Image, VStack } from "@chakra-ui/react"
import { useBoolean } from "ahooks"
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
  )
}
