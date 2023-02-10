import { styled, theme } from "src/stitches.config"

export const Input = styled("input", {
  padding: theme.space.sm,
  borderRadius: theme.radii.sm,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  fontFamily: theme.fonts.primary,
  backgroundColor: "transparent",
  fontSize: theme.fontSizes.md,
  "&:focus": {
    borderColor: theme.colors.solid,
    outline: "none",
  },
  "&::placeholder": {
    color: theme.colors["text-functional-low"],
    fontStyle: "italic",
  },
})

export default Input
