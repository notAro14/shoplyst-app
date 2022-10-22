import { styled, theme } from "src/styles/theme/stitches.config"

const Text = styled("p", {
  color: theme.colors["text-functional"],
  fontFamily: theme.fonts.sans,
  fontWeight: theme.fontWeights["extra-light"],
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
    paragraph: {
      true: {
        lineHeight: 1.65,
      },
    },
    noLineHeight: {
      true: {
        lineHeight: 1,
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
      accent: {
        color: theme.colors["text-accent"],
      },
      "accent-low": {
        color: theme.colors["text-accent-low"],
      },
      danger: {
        color: theme.colors["text-danger"],
      },
      "danger-low": {
        color: theme.colors["text-danger-low"],
      },
    },
    fontWeight: {
      regular: {
        fontWeight: theme.fontWeights.regular,
      },
    },
  },
  defaultVariants: {
    fontSize: "md",
    color: "functional",
  },
})

export default Text
