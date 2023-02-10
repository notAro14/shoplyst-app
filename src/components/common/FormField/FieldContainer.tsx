import { ReactNode } from "react"
import { Flex } from "src/components/common"
import FieldErrorText from "./FieldErrorText"

interface Props {
  children: ReactNode
  error?: string
}
export default function FieldContainer(props: Props) {
  const { children, error } = props
  return (
    <Flex direction="column" gap="xxs">
      {children}
      {error && <FieldErrorText>{error}</FieldErrorText>}
    </Flex>
  )
}
