import { FC, ReactNode } from "react"

import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import {
  CloseBtn,
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "src/components/common/dialog"

const ListDialog: FC<{
  isOpen: boolean
  onClose(): void
  children: ReactNode
}> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <StyledDialogContent
        css={{
          height: "fit-content",
        }}
      >
        <CloseBtn />
        <StyledDialogTitle asChild>
          <Heading as="h2" variant="h2">
            Nouvelle liste
          </Heading>
        </StyledDialogTitle>
        <Spacer />
        {children}
      </StyledDialogContent>
    </Dialog>
  )
}

export default ListDialog
