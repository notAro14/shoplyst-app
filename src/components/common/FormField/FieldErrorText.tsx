import { ReactNode } from "react"
import { Text } from "src/components/common"

interface Props {
  children: ReactNode
}
export default function FieldErrorText(props: Props) {
  const { children } = props
  return (
    <Text role="alert" color="danger-low" fontSize="sm">
      {children}
    </Text>
  )
}
