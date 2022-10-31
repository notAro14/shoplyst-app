import type * as Stitches from "@stitches/react"

import { styled, theme } from "src/stitches.config"

const Button = styled("button", {
  borderRadius: theme.radii.sm,
  fontFamily: theme.fonts.sans,
  fontSize: theme.fontSizes.md,
  padding: `${theme.space.xs} ${theme.space.lg}`,
  fontWeight: theme.fontWeights.light,
  border: "1px solid",
  boxShadow: theme.shadows.low,
  textTransform: "uppercase",

  transition: "box-shadow 200ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows.medium,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  compoundVariants: [
    {
      colorScheme: "brand",
      variant: "filled",
      css: {
        backgroundColor: theme.colors.solid,
        borderColor: theme.colors.solid,
        color: theme.colors["text-fg-black"],
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered"],
          borderColor: theme.colors["solid-hovered"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    {
      colorScheme: "danger",
      variant: "filled",
      css: {
        backgroundColor: theme.colors["solid-danger"],
        borderColor: theme.colors["solid-danger"],
        color: theme.colors["text-fg-white"],
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered-danger"],
          borderColor: theme.colors["solid-hovered-danger"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    {
      colorScheme: "accent",
      variant: "filled",
      css: {
        backgroundColor: theme.colors["solid-accent"],
        borderColor: theme.colors["solid-accent"],
        color: theme.colors["text-fg-white"],
        "&:hover": {
          backgroundColor: theme.colors["solid-hovered-accent"],
          borderColor: theme.colors["solid-hovered-accent"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    {
      colorScheme: "brand",
      variant: "outlined",
      css: {
        backgroundColor: "transparent",
        borderColor: theme.colors.border,
        color: theme.colors["text-vibrant-low"],
        fontWeight: theme.fontWeights.medium,
        "&:hover": {
          borderColor: theme.colors["border-hovered"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    {
      colorScheme: "danger",
      variant: "outlined",
      css: {
        backgroundColor: "transparent",
        borderColor: theme.colors["border-danger"],
        color: theme.colors["text-danger-low"],
        fontWeight: theme.fontWeights.medium,
        "&:hover": {
          borderColor: theme.colors["border-hovered-danger"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    {
      colorScheme: "accent",
      variant: "outlined",
      css: {
        backgroundColor: "transparent",
        borderColor: theme.colors["border-accent"],
        color: theme.colors["text-accent-low"],
        fontWeight: theme.fontWeights.medium,
        "&:hover": {
          borderColor: theme.colors["border-hovered-accent"],
          cursor: "pointer",
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
  ],
  variants: {
    unstyled: {
      true: {
        all: "unset",
      },
    },
    colorScheme: {
      danger: {},
      brand: {},
      accent: {},
    },
    variant: {
      filled: {},
      outlined: {},
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
  },
  defaultVariants: {
    variant: "filled",
    colorScheme: "brand",
  },
})

export type ButtonVariants = Stitches.VariantProps<typeof Button>
export default Button
