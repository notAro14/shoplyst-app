import { styled, theme } from "src/styles/theme/stitches.config"

export const StyledCTA = styled("a", {
  fontFamily: theme.fonts.fun,
  display: "block",
  textAlign: "center",
  color: theme.colors["text-accent-low"],
  letterSpacing: 2,
  fontSize: theme.fontSizes.xl,
  textDecoration: "none",
  transition: "transform 200ms ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
})

export default StyledCTA
