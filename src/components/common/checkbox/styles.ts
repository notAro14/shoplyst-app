import { css, theme } from "src/stitches.config"

export const label = css({
  color: theme.colors["text-functional"],
  fontFamily: theme.fonts.primary,
  variants: {
    readOnly: {
      true: {
        color: theme.colors["text-functional-low"],
        cursor: "not-allowed",
      },
    },
  },
})

export const root = css({
  all: "unset",
  backgroundColor: theme.colors.ui,
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows.low,
  "&:hover, &:focus": { backgroundColor: theme.colors["ui-hovered"] },
  [`&:focus ~ .${label}`]: {
    color: theme.colors["text-vibrant-low"],
  },
  variants: {
    readOnly: {
      true: {
        [`&:focus ~ .${label}`]: {
          color: theme.colors["text-functional-low"],
        },
        "&:hover, &:focus": {
          backgroundColor: theme.colors.ui,
          cursor: "not-allowed",
        },
      },
    },
  },
})

export const indicator = css({
  color: theme.colors.solid,
})()
