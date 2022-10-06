import type { FC } from "react"

import Paper from "../common/paper"
import Text from "../common/text"
import { theme, styled } from "src/styles/theme/stitches.config"
//import Loader from "src/components/common/loader"
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
//import Button from "src/components/common/button"
import { trpc } from "src/utils/trpc"
import Box from "src/components/common/box"
import { Category, Product } from "@prisma/client"
import produce from "immer"

const ProductButton = styled("button", {
  all: "unset",
  borderRadius: theme.radii.sm,
  "&:focus": {
    outline: "1px solid",
    outlineColor: theme.colors.solid,
  },
})

const CartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  )
}

const Categories: FC<{
  listId: string
  categories: (Category & { products: Product[] })[]
}> = ({ listId, categories }) => {
  //const {
  //  data: categories,
  //  isError,
  //  isLoading,
  //  refetch,
  //} = trpc.category.all.useQuery()

  // TODO: use find(listId) instead
  const { data: list } = trpc.list.first.useQuery()
  const productsInList = list?.products.map(({ product }) => product.id)

  const utils = trpc.useContext()
  const { mutate: addProduct } = trpc.list.addProduct.useMutation({
    async onSuccess() {
      // TODO: temporary
      await utils.list.first.invalidate()
    },
  })
  const { mutate: removeProduct } = trpc.list.removeProduct.useMutation({
    async onMutate(updated) {
      // TODO: temporary
      await utils.list.first.cancel()
      const previous = utils.list.first.getData()
      utils.list.first.setData((prev) =>
        produce(prev, (draft) => {
          if (!draft || !previous === null) return
          draft.products = draft.products.filter(
            (p) => p.product.id !== updated.productId
          )
        })
      )
      return { previous }
    },
    onError(_error, _updated, ctx) {
      // TODO: temporary
      utils.list.first.setData(ctx?.previous)
    },
    onSettled() {
      // TODO: temporary
      utils.list.first.invalidate()
    },
  })

  //if (isError) return <Failure onRetry={refetch} />
  //if (typeof categories === "undefined" || isLoading) return <Loader />
  if (categories.length === 0) return <Empty />
  const [def] = categories
  return (
    <Accordion collapsible type="single" defaultValue={def.name}>
      {categories?.map(({ id, name, products }) => (
        <AccordionItem key={id} value={name}>
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>
            <Flex
              wrap
              gap="sm"
              css={{
                paddingTop: theme.space.md,
                paddingBottom: theme.space.md,
              }}
            >
              {products.map((p) => {
                const inList = productsInList?.includes(p.id)
                return (
                  <ProductButton
                    key={p.id}
                    onClick={() => {
                      if (inList) removeProduct({ listId, productId: p.id })
                      else addProduct({ listId, productId: p.id })
                    }}
                  >
                    <Paper
                      borderRadius="sm"
                      css={{
                        display: "grid",
                        placeItems: "center",
                        position: "relative",
                        backgroundColor: theme.colors.ui,
                        transition: "all 200ms ease-in-out",
                        padding: `${theme.space.sm} ${theme.space.md}`,
                        userSelect: "none",
                        "&:hover": {
                          backgroundColor: theme.colors["ui-hovered"],
                        },
                      }}
                    >
                      {inList && (
                        <Box
                          as="span"
                          css={{
                            position: "absolute",
                            top: -5,
                            right: -10,
                            backgroundColor: theme.colors["ui-accent"],
                            padding: theme.space.xxs,
                            borderRadius: "50%",
                            border: "1px solid",
                            borderColor: theme.colors["bg-alt"],
                            color: theme.colors["text-accent-low"],
                            fontSize: theme.fontSizes.xs,
                          }}
                        >
                          <CartIcon />
                        </Box>
                      )}
                      <Text fontSize="sm">{p.name}</Text>
                    </Paper>
                  </ProductButton>
                )
              })}
            </Flex>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

//const Failure: FC<{ onRetry(): void }> = ({ onRetry }) => {
//  return (
//    <Paper
//      borderRadius="sm"
//      css={{
//        backgroundColor: theme.colors["ui-danger"],
//        padding: theme.space.md,
//        display: "flex",
//        flexDirection: "column",
//        gap: theme.space.sm,
//      }}
//    >
//      <Text color="danger-low" role="alert">
//        Une erreur s&apos;est produite
//      </Text>
//      <Button
//        variant="outlined"
//        size="small"
//        colorScheme="accent"
//        onClick={onRetry}
//      >
//        Réessayer
//      </Button>
//    </Paper>
//  )
//}

const Empty = () => {
  return <Text>Il n&apos;y a pas de produits.</Text>
}

export default Categories
