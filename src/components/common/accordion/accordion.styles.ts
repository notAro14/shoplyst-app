import { Trigger, Item, Header, Root, Content } from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { styled, theme, keyframes } from "src/styles/theme/stitches.config"

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
})

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
})

export const StyledTrigger = styled(Trigger, {
  backgroundColor: theme.colors.bg,
  borderRadius: theme.radii.md,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
  lineHeight: 1,
  fontFamily: theme.fonts.sans,
  fontWeight: theme.fontWeights.thin,
  padding: `${theme.space.sm} ${theme.space.md}`,
})
export const StyledItem = styled(Item, {
  overflow: "hidden",
  "& [data-state=open]": {
    [`& ${StyledTrigger}`]: {
      borderLeft: "4px solid",
      borderLeftColor: theme.colors.solid,
    },
  },
})
export const StyledHeader = styled(Header, {
  display: "flex",
})
export const StyledAccordion = styled(Root, {
  display: "flex",
  flexDirection: "column",
  gap: theme.space.sm,
})
export const StyledContent = styled(Content, {
  '&[data-state="open"]': {
    animation: `${slideDown} 200ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 200ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
})
export const StyledChevron = styled(ChevronDownIcon, {
  transition: "transform 200ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  color: "inherit",
})
