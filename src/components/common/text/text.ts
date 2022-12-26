import { styled, theme } from "src/stitches.config"

export const Text = styled("p", {
  variants: {
    fontSize: {
      xxs: {
        fontSize: theme.fontSizes.xxs,
      },
      xs: {
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        fontSize: theme.fontSizes.sm,
      },
      md: {
        fontSize: theme.fontSizes.md,
      },
      lg: {
        fontSize: theme.fontSizes.lg,
      },
      xl: {
        fontSize: theme.fontSizes.xl,
      },
      "2xl": {
        fontSize: theme.fontSizes["2xl"],
      },
      "3xl": {
        fontSize: theme.fontSizes["3xl"],
      },
      "4xl": {
        fontSize: theme.fontSizes["4xl"],
      },
    },
    variant: {
      text: {
        lineHeight: 1,
      },
      paragraph: {
        lineHeight: 1.65,
      },
    },
    color: {
      "functional-low": {
        color: theme.colors["text-functional-low"],
      },
      functional: {
        color: theme.colors["text-functional"],
      },
      vibrant: {
        color: theme.colors["text-vibrant"],
      },
      "vibrant-low": {
        color: theme.colors["text-vibrant-low"],
      },
      danger: {
        color: theme.colors["text-danger"],
      },
      "danger-low": {
        color: theme.colors["text-danger-low"],
      },
      warning: {
        color: theme.colors["text-warning"],
      },
      "warning-low": {
        color: theme.colors["text-warning-low"],
      },
    },
    fontWeight: {
      thin: {
        fontWeight: theme.fontWeights.thin,
      },
      "extra-light": {
        fontWeight: theme.fontWeights["extra-light"],
      },
      light: {
        fontWeight: theme.fontWeights.light,
      },
      regular: {
        fontWeight: theme.fontWeights.regular,
      },
      medium: {
        fontWeight: theme.fontWeights.medium,
      },
      "semi-bold": {
        fontWeight: theme.fontWeights["semi-bold"],
      },
      bold: {
        fontWeight: theme.fontWeights.bold,
      },
      "extra-bold": {
        fontWeight: theme.fontWeights["extra-bold"],
      },
      black: {
        fontWeight: theme.fontWeights.black,
      },
    },
    family: {
      primary: {
        fontFamily: theme.fonts.primary,
      },
      secondary: {
        fontFamily: theme.fonts.secondary,
      },
    },
  },
  defaultVariants: {
    color: "functional",
    family: "primary",
    fontSize: "md",
    fontWeight: "extra-light",
    variant: "paragraph",
  },
})

export default Text
