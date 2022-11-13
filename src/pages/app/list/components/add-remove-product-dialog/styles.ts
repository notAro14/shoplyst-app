import { css, theme } from "src/stitches.config"

export const dialog = css({
  height: 500,
  overflow: "auto",
  overscrollBehaviorY: "contain",
  scrollbarGutter: "stable",
})()

export const flex = css({
  padding: `${theme.space.md} ${theme.space.xxs}`,
})()
