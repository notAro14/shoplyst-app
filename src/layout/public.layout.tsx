import type { FC, ReactNode } from "react"

import { styled, theme } from "src/styles/theme/stitches.config"

import Footer from "src/layout/footer"
import Header from "src/layout/header"
import { GlobalLazyLoader } from "src/components/common/loader"

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
    maxWidth: 768,
    margin: "0 auto",
  },
})

interface Props {
  children: ReactNode
}
export const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <StyledSection>
      <GlobalLazyLoader />
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledSection>
  )
}

export default PublicLayout
