import { styled, theme } from "src/styles/theme/stitches.config"

export const StyledLabel = styled("label", {
  fontFamily: theme.fonts.sans,
  fontSize: theme.fontSizes.sm,
  color: theme.colors["text-functional-low"],
})
const fieldStyles = {
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
}
export const StyledInput = styled("input", fieldStyles)
export const StyledTextarea = styled("textarea", fieldStyles)
