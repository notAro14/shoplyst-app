import type { FC, ReactNode } from "react"
import { styled, theme } from "src/stitches.config"
import Footer from "src/layout/footer"
import { GlobalLazyLoader } from "src/components/common/loader"
import Header from "src/layout/header"
import Spacer from "src/components/common/spacer"

const StyledSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  backgroundColor: theme.colors.bg,
  transition: "background-color 200ms ease-in-out",
})

const StyledMain = styled("main", {
  padding: theme.space.md,
  "@sm": {
    width: 500,
    margin: "0 auto",
  },
})

interface Props {
  children: ReactNode
}
export const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <GlobalLazyLoader />
      <StyledSection>
        <Header />
        <Spacer size="sm" />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </StyledSection>
    </>
  )
}

export default PublicLayout
