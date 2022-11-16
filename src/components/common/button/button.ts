import type * as Stitches from "@stitches/react"

import { styled, theme } from "src/stitches.config"

const OPACITY_DISABLED = 0.5

export type ButtonProps = Parameters<typeof Button>

const Button = styled("button", {
  border: "1px solid",
  borderRadius: theme.radii.sm,
  boxShadow: theme.shadows.low,
  fontFamily: theme.fonts.primary,
  fontSize: theme.fontSizes.md,
  fontWeight: theme.fontWeights.light,
  padding: `${theme.space.xs} ${theme.space.lg}`,
  textTransform: "uppercase",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    cursor: "pointer",
  },
  "&:disabled, &:hover:disabled": {
    cursor: "not-allowed",
    opacity: OPACITY_DISABLED,
  },

  variants: {
    colorScheme: {
      danger: {},
      brand: {},
    },
    variant: {
      filled: {
        color: theme.colors["text-fg-white"],
      },
      outlined: {
        backgroundColor: "transparent",
        fontWeight: theme.fontWeights.medium,
      },
      ghost: {
        borderColor: "transparent",
        boxShadow: "unset",
      },
    },
    size: {
      small: {
        fontSize: theme.fontSizes.sm,
        padding: `${theme.space.xxs} ${theme.space.sm}`,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    rounded: {
      true: {
        borderRadius: "100%",
        padding: theme.space.xs,
      },
    },
  },
  compoundVariants: [
    {
      colorScheme: "brand",
      variant: "filled",
      css: {
        backgroundColor: theme.colors.solid,
        borderColor: theme.colors.solid,
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered"],
          borderColor: theme.colors["solid-hovered"],
        },
      },
    },
    {
      colorScheme: "danger",
      variant: "filled",
      css: {
        backgroundColor: theme.colors["solid-danger"],
        borderColor: theme.colors["solid-danger"],
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered-danger"],
          borderColor: theme.colors["solid-hovered-danger"],
        },
      },
    },

    {
      colorScheme: "brand",
      variant: "outlined",
      css: {
        borderColor: theme.colors.border,
        color: theme.colors["text-vibrant-low"],
        "&:hover": {
          borderColor: theme.colors["border-hovered"],
        },
      },
    },
    {
      colorScheme: "danger",
      variant: "outlined",
      css: {
        borderColor: theme.colors["border-danger"],
        color: theme.colors["text-danger-low"],
        "&:hover": {
          borderColor: theme.colors["border-hovered-danger"],
        },
      },
    },

    {
      colorScheme: "danger",
      variant: "ghost",
      css: {
        color: theme.colors["text-danger-low"],
        backgroundColor: theme.colors["ui-danger"],
        "&:hover": {
          backgroundColor: theme.colors["ui-hovered-danger"],
        },
      },
    },
    {
      colorScheme: "brand",
      variant: "ghost",
      css: {
        color: theme.colors["text-vibrant-low"],
        backgroundColor: theme.colors.ui,
        "&:hover": {
          backgroundColor: theme.colors["ui-hovered"],
        },
      },
    },
  ],

  defaultVariants: {
    variant: "filled",
    colorScheme: "brand",
  },
})

export type ButtonVariants = Stitches.VariantProps<typeof Button>
export default Button
