import { styled, theme } from "src/stitches.config"

const Heading = styled("h1", {
  color: theme.colors["text-functional"],
  fontFamily: theme.fonts.fun,
  letterSpacing: 2,
  variants: {
    variant: {
      h1: {
        fontSize: theme.fontSizes.xl,
      },
      h2: {
        fontSize: theme.fontSizes.lg,
      },
      h3: {
        fontSize: theme.fontSizes.md,
      },
    },
    vibrant: {
      true: {
        color: theme.colors["text-vibrant"],
      },
    },
  },
})

export default Heading
