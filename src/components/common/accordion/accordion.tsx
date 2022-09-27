import { forwardRef, ReactNode } from "react"

import {
  StyledAccordion,
  StyledHeader,
  StyledTrigger,
  StyledContent,
  StyledItem,
  StyledChevron,
} from "./accordion.styles"

export const Accordion = StyledAccordion
export const AccordionItem = StyledItem
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  { children: ReactNode }
>((props, ref) => {
  return (
    <StyledHeader>
      <StyledTrigger ref={ref}>
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
