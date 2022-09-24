import type { FC } from "react"
import { PlusIcon } from "@radix-ui/react-icons"

import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Paper from "src/components/common/paper"
import { styled, theme } from "src/styles/theme/stitches.config"
import Text from "src/components/common/text"
import Flex from "src/components/common/flex"
import IconButton from "src/components/common/icon-button"
import {
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "src/components/common/dialog"
import useDisclosure from "src/hooks/use-disclosure"

const Spacer = styled("div", {
  display: "block",
  variants: {
    size: {
      md: {
        height: theme.space.md,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const SHOPPING_MOCK: { id: number; name: string; detail: string }[] = [
  {
    id: 1,
    name: "Riz",
    detail: "1 paquet",
  },
  {
    id: 2,
    name: "Tomate",
    detail: "4 pièces",
  },
  {
    id: 3,
    name: "Pêche",
    detail: "4 pièces",
  },
]

const IndexPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SEO title="Shoplyst | Do your shopping with style" />
      <Heading as="h1" variant="h1">
        Quick list
      </Heading>
      <Spacer />
      <Flex
        as="ul"
        direction="column"
        gap="md"
        css={{
          listStyleType: "none",
        }}
      >
        {SHOPPING_MOCK.map(({ id, name, detail }) => {
          return (
            <Paper
              bordered={false}
              key={id}
              borderRadius="md"
              css={{
                padding: theme.space.md,
                width: "100%",
                minHeight: 75,
                display: "flex",
                flexDirection: "column",
                gap: theme.space.sm,
                backgroundColor: theme.colors.ui,
                transition: "all 200ms ease-in-out",
                borderLeft: "5px solid",
                borderLeftColor: theme.colors.solid,
                "&:hover": {
                  boxShadow: theme.shadows.medium,
                  backgroundColor: theme.colors["ui-hovered"],
                },
              }}
              as="li"
            >
              <Text>{name}</Text>
              <Text fontSize="sm" as="small" color="functional-low">
                {detail}
              </Text>
            </Paper>
          )
        })}
      </Flex>
      <Spacer />
      <IconButton
        css={{
          margin: "0 auto",
          display: "block",
        }}
        onClick={onOpen}
        rounded
        variant="ghost"
      >
        <PlusIcon />
      </IconButton>
      <Dialog onDismiss={onClose} isOpen={isOpen}>
        <StyledDialogContent>
          <StyledDialogTitle asChild>
            <Heading as="h1">Ajouter à la liste des courses</Heading>
          </StyledDialogTitle>
        </StyledDialogContent>
      </Dialog>
    </>
  )
}

export default IndexPage
