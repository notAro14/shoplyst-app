import { FC, ReactNode } from "react"
import { StyledHeading, StyledIconContainer } from "./page-heading.styles"

const PageHeading: FC<{ heading: string; icon?: ReactNode }> = ({
  heading,
  icon,
}) => {
  return (
    <StyledHeading as="h2" variant="h1">
      <StyledIconContainer as="span">{icon}</StyledIconContainer>
      <span>{heading}</span>
    </StyledHeading>
  )
}

export default PageHeading
