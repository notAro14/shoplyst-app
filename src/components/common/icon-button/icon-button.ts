import { styled, theme } from "src/styles/theme/stitches.config"

const IconButton = styled("button", {
  padding: theme.space.xs,
  borderRadius: theme.radii.md,
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
      },
      ghost: {
        border: "none",
        backgroundColor: theme.colors.ui,
        color: theme.colors["text-functional"],
        "&:hover": {
          backgroundColor: theme.colors["ui-hovered"],
          cursor: "pointer",
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
