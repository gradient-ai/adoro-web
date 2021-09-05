/* eslint-disable no-debugger */
import {
  Box,
  HStack,
  Image,
  Progress,
  VStack,
  useCounter,
  useTimeout,
} from "@chakra-ui/react"
import { useThrottle } from "ahooks"
import { useRouter } from "next/router"
import React, { useCallback } from "react"
import { usePrevious } from "react-use"
import { baseURL } from "services/api"

interface AdoroPreviewProps {
  basePath: string // base path for loading frames
  framesCount: number // int
}

const AdoroPreview: React.FC<AdoroPreviewProps> = ({
  basePath: path,
  framesCount,
}) => {
  const {
    valueAsNumber: frameIndex,
    increment: addFrames,
    decrement: subtractFrames,
    isAtMax: isAdoroComplete,
  } = useCounter({
    defaultValue: 0,
    min: 0,
    max: framesCount - 1,
  })

  const currentFrame = useThrottle(frameIndex, { wait: 10 })

  const currentImageURL = `${baseURL}/${path}/${currentFrame}.jpg`
  const previousImageURL = usePrevious(currentImageURL)

  const onFrameLoaded = useCallback(() => {
    addFrames(2)
  }, [addFrames])

  const onFrameNotReady = useCallback(() => {
    // If the first frame is not ready yet, then jump ahead,
    // which will trigger an error,
    // which will re-rerun this function but subtract frames back to 0 again
    // thereby rerendering and retrying
    if (frameIndex === 0) return addFrames(1)

    // clamped [min] to 0 through this use of 'min' above
    subtractFrames(3)
  }, [frameIndex, addFrames, subtractFrames])

  const router = useRouter()
  useTimeout(
    () => router.push({ pathname: "/share-meme", query: { path } }),
    isAdoroComplete ? 3000 : null,
  )

  return (
    <VStack
      alignItems="stretch"
      spacing={3}
      p={3}
      bg="white"
      rounded="md"
      boxShadow="md"
    >
      <Box position="relative" width={256} height={256}>
        <Image
          zIndex={2}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          id="active-frame"
          alt=""
          src={currentImageURL}
          onLoad={onFrameLoaded}
          onError={onFrameNotReady}
        />
        <Image
          id="previous-frame"
          src={previousImageURL}
          alt=""
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
      </Box>
      <Progress
        isAnimated
        hasStripe={isAdoroComplete}
        size="lg"
        value={currentFrame}
        max={framesCount}
        colorScheme="yellow"
        rounded="sm"
      />
    </VStack>
  )
}

export default function TimeMachine() {
  const router = useRouter()
  const { path, frames } = router.query

  return (
    <HStack>
      <AdoroPreview
        basePath={path as string}
        framesCount={parseInt(frames as string)}
      />
    </HStack>
  )
}
