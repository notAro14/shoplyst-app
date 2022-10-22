import { styled, theme } from "src/styles/theme/stitches.config"

const IconButton = styled("button", {
  padding: theme.space.xs,
  borderRadius: theme.radii.md,
  "&:focus": {
    outline: "1px solid",
    outlineColor: theme.colors.solid,
  },
  variants: {
    variant: {
      filled: {
        border: "none",
        backgroundColor: theme.colors.solid,
        color: theme.colors["text-functional"],
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "unset",
        },
      },
      outline: {
        border: `1px solid ${theme.colors.solid}`,
        backgroundColor: "transparent",
        color: theme.colors.solid,
        "&:hover": {
          cursor: "pointer",
          border: `1px solid ${theme.colors["solid-hovered"]}`,
          backgroundColor: "transparent",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "unset",
        },
      },
      ghost: {
        border: "none",
        backgroundColor: theme.colors.ui,
        color: theme.colors["text-functional"],
        "&:hover": {
          backgroundColor: theme.colors["ui-hovered"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "unset",
        },
      },
    },
    rounded: {
      true: {
        borderRadius: "50%",
      },
    },
  },
  defaultVariants: {
    variant: "filled",
  },
})

export default IconButton
