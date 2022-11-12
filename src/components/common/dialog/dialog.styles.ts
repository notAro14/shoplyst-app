import { Content } from "@radix-ui/react-dialog"
import { css, keyframes, styled, theme } from "src/stitches.config"

const contentShow = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(5%) scale(0.96)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
})

const overlayShow = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
})

export const title = css({})()
export const description = css({})()
export const StyledContent = styled(Content, {
  backgroundColor: theme.colors["bg-alt"],
  animation: `${contentShow} 150ms ease-in-out forwards`,
  borderRadius: theme.radii.md,
  padding: `${theme.space.xl} ${theme.space.xl}`,
  width: "90%",
  position: "relative",

  "@sm": {
    maxWidth: 400,
  },
})
export const overlay = css({
  backgroundColor: theme.colors.overlay,
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  animation: `${overlayShow} 150ms ease-in-out forwards`,
})()
export const close = css({
  borderRadius: "50%",
  border: "none",
  padding: theme.space.xxs,
  boxShadow: theme.shadows.low,
  backgroundColor: theme.colors.ui,
  position: "fixed",
  top: 10,
  right: 10,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.colors["ui-hovered"],
  },
})()
