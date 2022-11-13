import { FC, ReactNode } from "react"

import useAutoanimate from "src/hooks/use-autoanimate"

const AnimatedList: FC<{ children: ReactNode; className?: string }> = ({
  className,
  children,
}) => {
  const animatedRef = useAutoanimate<HTMLUListElement>()
  return (
    <ul className={className} ref={animatedRef}>
      {children}
    </ul>
  )
}

export default AnimatedList
