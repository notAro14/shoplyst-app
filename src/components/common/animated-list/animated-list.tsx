import { ElementType, FC, ReactNode } from "react"

import useAutoanimate from "src/hooks/use-autoanimate"
import Box from "src/components/common/box"

const AnimatedList: FC<{
  children: ReactNode
  className?: string
  as?: ElementType
}> = ({ className, children, as }) => {
  const animatedRef = useAutoanimate<HTMLUListElement>()
  return (
    <Box as={as} className={className} ref={animatedRef}>
      {children}
    </Box>
  )
}

export default AnimatedList
