import { css, theme } from "src/stitches.config"

export const label = css({
  fontFamily: theme.fonts.sans,
  fontSize: theme.fontSizes.sm,
  color: theme.colors["text-functional-low"],
})()
export const field = css({
  padding: theme.space.sm,
  borderRadius: theme.radii.sm,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  fontFamily: theme.fonts.sans,
  backgroundColor: "transparent",
  fontSize: theme.fontSizes.sm,
  "&:focus": {
    borderColor: theme.colors.solid,
    outline: "none",
  },
  "&::placeholder": {
    color: theme.colors["text-functional-low"],
    fontStyle: "italic",
  },
})()
