import { styled, theme } from "src/stitches.config"

const Spacer = styled("div", {
  display: "block",
  variants: {
    size: {
      xxs: {
        height: theme.space.xxs,
      },
      xs: {
        height: theme.space.xs,
      },
      sm: {
        height: theme.space.sm,
      },
      md: {
        height: theme.space.md,
      },
      lg: {
        height: theme.space.lg,
      },
      xl: {
        height: theme.space.xl,
      },
      "2xl": {
        height: theme.space["2xl"],
      },
      "3xl": {
        height: theme.space["3xl"],
      },
      "4xl": {
        height: theme.space["4xl"],
      },
      "5xl": {
        height: theme.space["5xl"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export default Spacer
