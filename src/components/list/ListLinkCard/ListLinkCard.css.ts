import { css, theme } from "src/stitches.config"

const paper = css({
  padding: `${theme.space.sm} ${theme.space.sm}`,
  width: "100%",
  transition: "box-shadow 150ms ease-in-out",
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
    boxShadow: theme.shadows.medium,
  },
})()
const description = css({
  maxLine: 2,
  lineHeight: 1.65,
})()

export const styles = {
  paper,
  description,
}

export default styles
