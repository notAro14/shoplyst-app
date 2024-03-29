import { styled, theme } from "src/stitches.config"
import Box from "src/components/common/box"
import Heading from "src/components/common/heading/heading"

export const StyledIconContainer = styled(Box, {
  // to have pixel perfect alignment with text
  transform: "translateY(-2px)",
})
export const StyledHeading = styled(Heading.H2, {
  display: "flex",
  alignItems: "center",
  gap: theme.space.xs,
  userSelect: "none",
})
