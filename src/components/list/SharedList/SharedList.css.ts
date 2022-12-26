import { css, theme } from "src/stitches.config"

const sharedList = css({
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
export const description = css({
  maxLine: 2,
  lineHeight: 1.65,
})()
export const spacerLine = css({
  borderBottom: "1px solid",
  borderBottomColor: theme.colors["border-gray"],
})()
export const products = css({
  listStyleType: "none",
})()

const styles = {
  sharedList,
  isArchivedAlert,
  description,
  spacerLine,
  products,
}
export default styles
