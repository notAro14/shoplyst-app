import * as RadixDialog from "@radix-ui/react-dialog"
import { Cross1Icon } from "@radix-ui/react-icons"
import { FC, ReactNode } from "react"
import { keyframes, styled, theme } from "src/stitches.config"

const contentShow = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(5%) scale(0.96)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
})

const overlayShow = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
})

export const StyledDialogTitle = styled(RadixDialog.Title, {})
export const StyledDialogDesc = styled(RadixDialog.Description, {})
export const StyledDialogContent = styled(RadixDialog.Content, {
  backgroundColor: theme.colors["bg-alt"],
  animation: `${contentShow} 150ms ease-in-out forwards`,
  borderRadius: theme.radii.md,
  padding: `${theme.space.xl} ${theme.space.xl}`,
  width: "90%",
  position: "relative",

  "@sm": {
    maxWidth: 400,
  },
})
const StyledOverlay = styled(RadixDialog.Overlay, {
  backgroundColor: theme.colors.overlay,
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  animation: `${overlayShow} 150ms ease-in-out forwards`,
})
export const StyledCloseBtn = styled(RadixDialog.DialogClose, {
  borderRadius: "50%",
  border: "none",
  padding: theme.space.xxs,
  boxShadow: theme.shadows.low,
  backgroundColor: theme.colors.ui,
  position: "fixed",
  top: 10,
  right: 10,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.colors["ui-hovered"],
  },
})
export const CloseBtn = () => {
  return (
    <StyledCloseBtn aria-label="Fermer">
      <Cross1Icon />
    </StyledCloseBtn>
  )
}

export const Dialog: FC<{
  children: ReactNode
  isOpen?: boolean
  onDismiss?: () => void
}> = ({ children, isOpen, onDismiss }) => {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onDismiss}>
      <RadixDialog.Portal>
        <StyledOverlay>{children}</StyledOverlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export default Dialog
