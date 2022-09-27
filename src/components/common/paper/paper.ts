import { styled, theme } from "src/styles/theme/stitches.config"

const Paper = styled("div", {
  variants: {
    elevation: {
      low: {
        boxShadow: theme.shadows.low,
      },
      medium: {
        boxShadow: theme.shadows.medium,
      },
      high: {
        boxShadow: theme.shadows.high,
      },
    },
    borderRadius: {
      sm: {
        borderRadius: theme.radii.sm,
      },
      md: {
        borderRadius: theme.radii.md,
      },
      lg: {
        borderRadius: theme.radii.lg,
      },
    },
    bordered: {
      true: {
        border: "1px solid",
        borderColor: theme.colors["border-gray"],
      },
    },
  },
  defaultVariants: {
    elevation: "low",
  },
})

export default Paper
