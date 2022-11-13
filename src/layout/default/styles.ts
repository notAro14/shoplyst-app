import { css, theme } from "src/stitches.config"

export const section = css({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  backgroundColor: theme.colors.bg,
  transition: "background-color 200ms ease-in-out",
})()

export const main = css({
  padding: theme.space.md,
  "@sm": {
    width: 500,
    margin: "0 auto",
  },
})()
