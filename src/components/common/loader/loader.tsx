//import { DotPulse, Ping, DotSpinner } from "@uiball/loaders"
import { FC, useEffect, useState } from "react"

import Box from "src/components/common/box"
import { DotPulse } from "./dotpulse"
import { DotSpinner } from "./dot-spinner"
import { Ping } from "./ping"

interface Props {
  type?: "dotpulse" | "dotspinner" | "ping"
}
export const Loader: FC<Props> = ({ type = "ping" }) => {
  switch (type) {
    case "dotpulse":
      return (
        <Box role="progressbar">
          <DotPulse />
        </Box>
      )
    case "dotspinner":
      return (
        <Box role="progressbar">
          <DotSpinner />
        </Box>
      )
    case "ping":
      return (
        <Box role="progressbar">
          <Ping />
        </Box>
      )
    default:
      throw new Error("Unknown loader type")
  }
}

export const useLazyLoader = (show: boolean, delay = 400) => {
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (show === false) {
      setShowLoader(false)
      return
    }
    if (delay === 0) {
      setShowLoader(true)
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [show, delay])

  return showLoader
}

export const LazyLoader: FC<
  Props & {
    show: boolean
    delay?: number
  }
> = (props) => {
  const { show, delay } = props
  const showLoader = useLazyLoader(show, delay)
  return showLoader ? <Loader {...props} /> : null
}

export default Loader
