import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "src/components/common/icons"
import { keyframes, styled, theme } from "src/stitches.config"

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
  borderRadius: theme.radii.sm,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
  lineHeight: 1,
  fontFamily: theme.fonts.primary,
  padding: `${theme.space.sm} ${theme.space.md}`,
  color: theme.colors["text-functional-low"],
  textTransform: "uppercase",
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.regular,
})
export const StyledItem = styled(Item, {
  overflow: "hidden",
  "& [data-state=open]": {
    [`& ${StyledTrigger}`]: {
      borderColor: theme.colors.border,
    },
  },
})
export const StyledHeader = styled(Header, {
  display: "flex",
})
export const StyledAccordion = styled(Root, {
  display: "flex",
  flexDirection: "column",
  gap: theme.space.md,
})
export const StyledContent = styled(Content, {
  '&[data-state="open"]': {
    animation: `${slideDown} 175ms ease-in-out`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 175ms ease-in-out`,
  },
})
export const StyledChevron = styled(ChevronDownIcon, {
  transition: "transform 175ms ease-in-out",
  "[data-state=open] > &": { transform: "rotate(-180deg)" },
  color: "inherit",
})
