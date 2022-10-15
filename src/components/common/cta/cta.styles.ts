import { styled, theme } from "src/styles/theme/stitches.config"

export const StyledCTA = styled("a", {
  textDecoration: "none",
  display: "grid",
  placeItems: "center",
  fontFamily: theme.fonts.sans,
  backgroundColor: theme.colors["solid-accent"],
  padding: theme.space.sm,
  borderRadius: theme.radii.sm,
  boxShadow: theme.shadows.low,
  lineHeight: 1,
  transition: "box-shadow 200ms ease-in-out",
  color: theme.colors["text-fg-white"],
  width: "fit-content",
  textTransform: "uppercase",
  fontSize: theme.fontSizes.sm,
  "&:hover": {
    boxShadow: theme.shadows.medium,
    cursor: "pointer",
  },
})

export default StyledCTA
