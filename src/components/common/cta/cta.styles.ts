import { styled, theme } from "src/stitches.config"

export const StyledCTA = styled("a", {
  textDecoration: "none",
  display: "grid",
  placeItems: "center",
  fontFamily: theme.fonts.primary,
  backgroundColor: theme.colors.solid,
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
