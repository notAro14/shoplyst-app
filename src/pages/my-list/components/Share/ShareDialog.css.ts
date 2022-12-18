import { styled, theme } from "src/stitches.config"

export const Fieldset = styled("fieldset", {
  display: "flex",
  flexDirection: "column",
  gap: theme.space.md,
  border: "none",
  maxHeight: 500,
  overflow: "auto",
})
