import { FC, useRef } from "react"

import { trpc } from "src/utils/trpc"
import useDisclosure from "src/hooks/use-disclosure"
import {
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
  CloseBtn,
} from "src/components/common/dialog"
import Button from "src/components/common/button"
import Flex from "src/components/common/flex"
import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import { StyledInput, StyledLabel } from "./create-list.styles"

const CreateListDialog: FC<{ isOpen: boolean; onClose(): void }> = ({
  isOpen,
  onClose,
}) => {
  const utils = trpc.useContext()
  const { mutate: createList, isLoading } = trpc.list.create.useMutation({
    async onSuccess() {
      await utils.list.all.invalidate()
      onClose()
    },
  })
  const listNameRef = useRef<HTMLInputElement | null>(null)
  const listDescRef = useRef<HTMLInputElement | null>(null)
  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <StyledDialogContent
        css={{
          height: "fit-content",
        }}
        onOpenAutoFocus={(evt) => {
          evt.preventDefault()
          listNameRef.current?.focus()
        }}
      >
        <CloseBtn />
        <StyledDialogTitle asChild>
          <Heading as="h2" variant="h2">
            Nouvelle liste
          </Heading>
        </StyledDialogTitle>
        <Spacer />
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            if (
              typeof listNameRef.current?.value === "undefined" ||
              typeof listDescRef.current?.value === "undefined"
            )
              return
            createList({
              name: listNameRef.current.value,
              description: listDescRef.current.value,
              products: [],
            })
          }}
        >
          <Flex direction="column" gap="xxs">
            <StyledLabel htmlFor="list.name">Titre</StyledLabel>
            <StyledInput
              type="text"
              required
              placeholder="ex : Aujourd'hui"
              ref={listNameRef}
              autoComplete="off"
              id="list.name"
            />
          </Flex>
          <Spacer />
          <Spacer />
          <Flex direction="column" gap="xxs">
            <StyledLabel htmlFor="list.description">
              Description (optionnelle)
            </StyledLabel>
            <StyledInput
              placeholder="ex : Les courses hebdomadaires"
              ref={listDescRef}
              id="list.description"
            />
          </Flex>
          <Spacer size="xl" />
          <Button
            colorScheme="accent"
            size="small"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            Créer
          </Button>
        </form>
      </StyledDialogContent>
    </Dialog>
  )
}

const CreateList: FC<{ title: string }> = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <CreateListDialog isOpen={isOpen} onClose={onClose} />
      <Button onClick={onOpen} size="small" colorScheme="accent" fullWidth>
        {title}
      </Button>
    </>
  )
}

export default CreateList
