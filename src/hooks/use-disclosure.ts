import { useCallback, useState } from "react"

export const useDisclosure = () => {
  const [isOpen, setOpen] = useState(false)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  return { isOpen, onOpen, onClose }
}

export default useDisclosure
