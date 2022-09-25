import type { FC, ReactNode } from "react"

import { styled, theme } from "src/styles/theme/stitches.config"

import Footer from "src/layout/footer"
import Header from "src/layout/header"

const StyledSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  backgroundColor: theme.colors.bg,
  transition: "background-color 200ms ease-in-out",
})

const StyledMain = styled("main", {
  padding: theme.space.lg,
  "@sm": {
    minWidth: 500,
    margin: "0 auto",
  },
})

interface Props {
  children: ReactNode
}
export const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <StyledSection>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledSection>
  )
}

export default PublicLayout
