import { ReactNode, forwardRef } from "react"
import type { CSS, VariantProps } from "@stitches/react"

import { styled, theme } from "src/stitches.config"
import { ExternalLinkIcon } from "src/components/common/icons"

const StyledLink = styled("a", {
  color: theme.colors["text-vibrant-low"],
  fontFamily: theme.fonts.primary,
  textDecoration: "none",
  lineHeight: 1,
  variants: {
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
    variant: {
      navlink: {
        color: theme.colors["text-functional"],
      },
    },
    active: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "navlink",
      active: "true",
      css: {
        color: theme.colors["text-vibrant-low"],
      },
    },
  ],
})

interface Props extends VariantProps<typeof StyledLink> {
  css?: CSS
  children: ReactNode
  isExternal?: boolean
  href?: string
  className?: string
}

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ children, isExternal, css, className, ...rest }, ref) => {
    return (
      <StyledLink
        className={className}
        css={{
          ...css,
          display: "flex",
          alignItems: "center",
          gap: theme.space.xxs,
        }}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...rest}
        ref={ref}
      >
        {children}
        {isExternal && <ExternalLinkIcon />}
      </StyledLink>
    )
  }
)
Link.displayName = "Link"

export default Link
