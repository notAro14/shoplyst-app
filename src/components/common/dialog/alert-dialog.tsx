import { FC } from "react"
import {
  Root,
  Portal,
  Overlay,
  Title,
  Description,
  Cancel,
  Action,
  Content,
} from "@radix-ui/react-alert-dialog"

import * as styles from "./dialog.styles"
import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import Text from "src/components/common/text"
import Flex from "../flex"
import Button from "../button"

export const AlertDialog: FC<{
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
  title: string
  description: string
}> = ({ isOpen, onOpenChange, title, description, onCancel, onConfirm }) => {
  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay className={styles.overlay}>
          <Content className={styles.content}>
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
            <Flex direction="column" gap="md">
              <Action asChild>
                <Button
                  variant="ghost"
                  colorScheme="danger"
                  fullWidth
                  onClick={onConfirm}
                >
                  Supprimer
                </Button>
              </Action>
              <Cancel asChild>
                <Button variant="outlined" fullWidth onClick={onCancel}>
                  Annuler
                </Button>
              </Cancel>
            </Flex>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  )
}

export default AlertDialog
