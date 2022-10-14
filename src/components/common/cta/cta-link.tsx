import StyledCTA from "./cta.styles"
import NextLink from "next/link"

import type { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  href: string
}

export const CtaLink: FC<Props> = ({ children, href }) => {
  return (
    <NextLink passHref href={href}>
      <StyledCTA as="a">{children}</StyledCTA>
    </NextLink>
  )
}

export default CtaLink
