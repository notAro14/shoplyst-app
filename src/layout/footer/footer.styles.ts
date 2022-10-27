import { styled, theme } from "src/stitches.config"

export const Container = styled("footer", {
  marginTop: "auto",
  backgroundColor: theme.colors.bg,
  display: "grid",
  placeItems: "center",
  height: 100,
  borderTop: "1px solid",
  borderTopColor: theme.colors["border-gray"],
})
