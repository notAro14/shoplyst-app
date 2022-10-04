import type { FC, ReactNode } from "react"
import { useIsFetching } from "@tanstack/react-query"

import { styled, theme } from "src/styles/theme/stitches.config"

import Footer from "src/layout/footer"
import Header from "src/layout/header"
import Loader from "src/components/common/loader"
import Box from "src/components/common/box"

const StyledSection = styled("section", {
  display: "flex",
  position: "relative",
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
  const isFetching = useIsFetching()
  return (
    <StyledSection>
      {isFetching ? (
        <Box
          css={{
            position: "absolute",
            top: 15,
            left: 15,
          }}
        >
          <Loader />
        </Box>
      ) : null}
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledSection>
  )
}

export default PublicLayout
