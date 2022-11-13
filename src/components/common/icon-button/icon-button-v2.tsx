import { FC, ReactNode } from "react"
import Button, { ButtonVariants } from "src/components/common/button"

interface Props extends ButtonVariants {
  icon: ReactNode
  label: string
  onClick?: () => void
  disabled?: boolean
}

const IconButton: FC<Props> = ({ icon, label, ...rest }) => {
  return (
    <Button aria-label={label} rounded {...rest}>
      {icon}
    </Button>
  )
}

export default IconButton
