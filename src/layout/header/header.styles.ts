import { styled, theme } from "src/styles/theme/stitches.config"

export const StyledHeader = styled("header", {
  display: "grid",
  placeItems: "center",
  height: 100,
  padding: `0 ${theme.space.lg}`,
  position: "sticky",
  top: theme.space.xs,
  "@sm": {
    margin: "0 auto",
    width: 500,
    padding: "unset",
  },
})

export const StyledNav = styled("nav", {
  backgroundColor: theme.colors["bg-transparent"],
  backdropFilter: "blur(10px)",
  borderRadius: theme.radii.lg,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.space.md,
  width: "100%",
  height: "100%",
  boxShadow: theme.shadows.low,
})
