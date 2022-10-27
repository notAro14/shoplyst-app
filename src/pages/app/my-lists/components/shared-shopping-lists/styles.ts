import { css, theme } from "src/stitches.config"

export const description = css({
  maxLine: 2,
  lineHeight: 1.65,
})()
export const information = css({
  display: "flex",
  alignItems: "center",
  gap: theme.space.sm,
  userSelect: "none",
})()
export const sharedShoppingListsContainer = css({
  userSelect: "none",
})()
export const sharedShoppingListContainer = css({
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  borderRadius: theme.radii.sm,
  padding: theme.space.md,
})()
export const isArchivedAlert = css({
  display: "flex",
  gap: theme.space.sm,
  alignItems: "center",
})()
export const spacerLine = css({
  borderBottom: "1px solid",
  borderBottomColor: theme.colors["border-gray"],
})()
export const productsContainer = css({
  listStyleType: "none",
  maxHeight: 250,
  overflow: "auto",
  scrollbarGutter: "stable",
  overscrollBehaviorY: "contain",
})()
export const purchased = css({
  textDecoration: "line-through",
  color: theme.colors["text-functional-low"],
  fontSize: theme.fontSizes.sm,
})()
