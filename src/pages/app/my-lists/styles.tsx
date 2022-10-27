import { FC, ReactNode } from "react"

import { css, theme } from "src/stitches.config"
import Paper from "src/components/common/paper"
import Flex from "src/components/common/flex"
import useAutoanimate from "src/hooks/use-autoanimate"
import Text from "src/components/common/text"
import { TextEllipsed } from "src/components/common/ellipsed"

export const loadingContainer = css({
  width: "100%",
  height: 150,
  display: "grid",
  placeItems: "center",
})()

const styledPaper = css({
  padding: `${theme.space.sm} ${theme.space.sm}`,
  width: "100%",
  transition: "box-shadow 150ms ease-in-out",
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
    boxShadow: theme.shadows.medium,
  },
})()
export const StyledPaper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Paper
      as="span"
      bordered
      borderRadius="sm"
      elevation="low"
      className={styledPaper}
    >
      {children}
    </Paper>
  )
}

const styledUList = css({ listStyleType: "none" })()
export const StyledUList: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      ref={useAutoanimate<HTMLUListElement>()}
      direction="column"
      justify="space-around"
      gap="lg"
      as="ul"
      className={styledUList}
    >
      {children}
    </Flex>
  )
}

export const StyledQuantityIndication: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Text as="small" noLineHeight fontSize="xs" color="functional-low">
      {children}
    </Text>
  )
}

const styledDescription = css({
  maxLine: 2,
  lineHeight: 1.65,
})()
export const StyledDescription: FC<{ desc: string }> = ({ desc }) => {
  return (
    <TextEllipsed
      as="em"
      fontSize="sm"
      color="functional-low"
      className={styledDescription}
    >
      {desc}
    </TextEllipsed>
  )
}
