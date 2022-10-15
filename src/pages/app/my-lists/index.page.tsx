import { useIsRestoring } from "@tanstack/react-query"
import { FC, useRef } from "react"

import Box from "src/components/common/box"
import Heading from "src/components/common/heading"
import Loader from "src/components/common/loader"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import type { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import { ListIcon } from "src/components/common/icons"
import SEO from "src/components/common/seo"
import MyLists from "./components/my-lists"
import Button from "src/components/common/button"
import PublicLayout from "src/layout/public.layout"
import AppShell from "src/components/app-shell"
import useDisclosure from "src/hooks/use-disclosure"
import {
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
  CloseBtn,
} from "src/components/common/dialog"
import Flex from "src/components/common/flex"
import { styled, theme } from "src/styles/theme/stitches.config"

const StyledLabel = styled("label", {
  fontFamily: theme.fonts.sans,
  fontSize: theme.fontSizes.sm,
  color: theme.colors["text-functional-low"],
})
const fieldStyles = {
  padding: theme.space.sm,
  borderRadius: theme.radii.sm,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  fontFamily: theme.fonts.sans,
  backgroundColor: "transparent",
  "&:focus": {
    borderColor: theme.colors.solid,
    outline: "none",
  },
}
const StyledInput = styled("input", fieldStyles)
const StyledTextarea = styled("textarea", fieldStyles)

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
  const listDescRef = useRef<HTMLTextAreaElement | null>(null)
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
              required
              placeholder="Pour la semaine"
              ref={listNameRef}
              id="list.name"
            />
          </Flex>
          <Spacer />
          <Flex direction="column" gap="xxs">
            <StyledLabel htmlFor="list.description">Description</StyledLabel>
            <StyledTextarea
              placeholder="Les courses hebdomadaires"
              ref={listDescRef}
              id="list.description"
            />
          </Flex>
          <Spacer />
          <Spacer />
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

const Empty: FC = () => {
  return (
    <>
      <SEO title="Shoplyst | Mes listes de courses" />
      <Box css={{ margin: "0 auto", width: "fit-content" }}>
        <Text fontSize="md">Commence par créer une liste</Text>
        <Spacer />
        <CreateList title="Créer" />
      </Box>
    </>
  )
}

const MyListsPage: NextPageWithLayout = () => {
  const isRestoring = useIsRestoring()
  const {
    data: lists,
    isLoading,
    isFetching,
    isError,
  } = trpc.list.all.useQuery()

  if (lists?.length)
    return (
      <>
        <SEO title="Shoplyst | Mes listes de courses" />
        <Heading
          as="h1"
          variant="h1"
          css={{ display: "flex", alignItems: "center", gap: theme.space.xs }}
        >
          <Box
            css={{
              // to have pixel perfect alignment with text
              transform: "translateY(-2px)",
            }}
            as="span"
          >
            <ListIcon />
          </Box>
          <span>Mes listes de courses</span>
        </Heading>
        <Spacer />
        <MyLists lists={lists} />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <CreateList title="Créer une nouvelle liste" />
      </>
    )

  if ((isLoading && isFetching) || isRestoring)
    return (
      <>
        <SEO title="Shoplyst | Chargement..." />
        <Loader />
      </>
    )

  if (isError)
    return (
      <>
        <SEO title="Shoplyst | Erreur de chargement" />
        <Text color="danger-low">
          Oups, tes listes de courses n&apos;ont pas été chargées
        </Text>
      </>
    )

  return <Empty />
}

MyListsPage.getLayout = (page) => (
  <PublicLayout>
    <AppShell>{page}</AppShell>
  </PublicLayout>
)

export default MyListsPage
