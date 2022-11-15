import { css, theme } from "src/stitches.config"

export const link = css({
  display: "flex",
  alignItems: "center",
  gap: theme.space.sm,
})()

export const archivedCaption = css({
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.space.xs,
})()

export const infoCaption = css({
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.space.xs,
})()

export const listName = css({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  userSelect: "none",
})()

export const listDescription = css({
  maxLine: 3,
  lineHeight: 1.65,
  userSelect: "none",
})()

export const productsContainer = css({
  border: "none",
})()

export const product = css({
  color: theme.colors["text-functional-low"],
  fontSize: theme.fontSizes.sm,
  display: "flex",
  gap: theme.space.sm,
  alignItems: "center",
})()

export const animatedList = css({
  display: "flex",
  flexDirection: "column",
  gap: theme.space.md,
  border: "none",
})()
