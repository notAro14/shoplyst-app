import { CSS } from "@stitches/react"
import { ReactNode, forwardRef } from "react"

import {
  StyledAccordion,
  StyledChevron,
  StyledContent,
  StyledHeader,
  StyledItem,
  StyledTrigger,
} from "./accordion.styles"

export const Accordion = StyledAccordion
export const AccordionItem = StyledItem
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  { children: ReactNode; css?: CSS }
>((props, ref) => {
  return (
    <StyledHeader>
      <StyledTrigger css={props.css} ref={ref}>
        {props.children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>((props, ref) => <StyledContent ref={ref}>{props.children}</StyledContent>)
AccordionContent.displayName = "AccordionContent"
