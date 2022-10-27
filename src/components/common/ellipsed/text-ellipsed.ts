import { styled } from "src/stitches.config"
import Text from "src/components/common/text"

export const TextEllipsed = styled(Text, {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  lineClamp: "1",
  "-webkit-line-clamp": "1",
})

export default TextEllipsed
