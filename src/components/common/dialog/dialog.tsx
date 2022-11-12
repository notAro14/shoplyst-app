import { FC, ReactNode } from "react"
import {
  Close,
  Root,
  Portal,
  Overlay,
  Title,
  Description,
} from "@radix-ui/react-dialog"
import { Cross1Icon } from "@radix-ui/react-icons"

import * as styles from "./dialog.styles"
import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import Text from "src/components/common/text"

const { StyledContent } = styles

export const Dialog: FC<{
  children: ReactNode
  isOpen?: boolean
  onDismiss?: () => void
  title?: string
  description?: string
  className?: string
}> = ({ children, isOpen, onDismiss, title, description, className }) => {
  return (
    <Root open={isOpen} onOpenChange={onDismiss}>
      <Portal>
        <Overlay className={styles.overlay}>
          <StyledContent className={className}>
            <Close className={styles.close} aria-label="Fermer">
              <Cross1Icon />
            </Close>
            {title && (
              <Title asChild className={styles.title}>
                <Heading variant="h2" as="h2">
                  {title}
                </Heading>
              </Title>
            )}
            {description && (
              <Description asChild className={styles.description}>
                <Text>{description}</Text>
              </Description>
            )}
            <Spacer />
            {children}
          </StyledContent>
        </Overlay>
      </Portal>
    </Root>
  )
}

export default Dialog
