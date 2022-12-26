import { css, theme } from "src/stitches.config"

const information = css({
  display: "flex",
  alignItems: "center",
  gap: theme.space.sm,
  userSelect: "none",
})()
const sharedShoppingListsContainer = css({
  userSelect: "none",
  listStyleType: "none",
})()
const purchased = css({
  textDecoration: "line-through",
  color: theme.colors["text-functional-low"],
  fontSize: theme.fontSizes.sm,
})()

const styles = {
  information,
  sharedShoppingListsContainer,
  purchased,
}
export default styles
