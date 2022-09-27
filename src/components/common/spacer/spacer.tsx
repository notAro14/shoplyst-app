import { styled, theme } from "src/styles/theme/stitches.config"

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
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export default Spacer
