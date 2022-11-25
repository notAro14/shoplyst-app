import { FC, ReactNode } from "react"
import {
  Close,
  Root,
  Portal,
  Overlay,
  Title,
  Description,
  Content,
} from "@radix-ui/react-dialog"
import { Cross1Icon } from "src/components/common/icons"

import * as styles from "./dialog.styles"
import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import Text from "src/components/common/text"
import { styled, theme } from "src/stitches.config"

export const StyledContent = styled(Content, {
  backgroundColor: theme.colors["bg-alt"],
  animation: `${styles.contentShow} 150ms ease-in-out forwards`,
  borderRadius: theme.radii.md,
  padding: `${theme.space.xl} ${theme.space.xl}`,
  width: "90%",
  position: "relative",

  "@sm": {
    maxWidth: 400,
  },
})

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
                <Heading.H2>{title}</Heading.H2>
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
