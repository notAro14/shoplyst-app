import { useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"

export const useAutoanimate = <T>() => {
  const parent = useRef<(T & HTMLElement) | null>(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return parent
}

export default useAutoanimate
