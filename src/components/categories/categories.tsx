import type { FC } from "react"

import Paper from "../common/paper"
import Text from "../common/text"
import { css, theme } from "src/styles/theme/stitches.config"
import Loader from "src/components/common/loader"
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
import { trpc } from "src/utils/trpc"
import Box from "src/components/common/box"
import Button from "src/components/common/button"
import produce from "immer"
import { CartIcon } from "src/components/common/icons"

const Categories: FC<{
  productsInCurrentList: number[]
  listId: string
}> = ({ productsInCurrentList, listId }) => {
  const {
    data: categories,
    isError,
    refetch,
    isLoading,
    isFetching,
  } = trpc.category.all.useQuery()
  const utils = trpc.useContext()
  const { mutate: addProduct } = trpc.list.addProduct.useMutation({
    async onSuccess() {
      await utils.list.find.invalidate(listId)
    },
  })
  const { mutate: removeProduct } = trpc.list.removeProduct.useMutation({
    async onMutate(updated) {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData(
        (prev) =>
          produce(prev, (draft) => {
            if (!draft || !previous === null) return
            draft.products = draft.products.filter(
              (p) => p.product.id !== updated.productId
            )
          }),
        listId
      )
      return { previous }
    },
    onError(_error, _updated, ctx) {
      utils.list.find.setData(ctx?.previous, listId)
    },
    onSettled() {
      utils.list.find.invalidate(listId)
    },
  })

  if (categories?.length)
    return (
      <Accordion collapsible type="single" defaultValue={categories[0].name}>
        {categories?.map(({ id, name, products }) => (
          <AccordionItem key={id} value={name}>
            <AccordionTrigger>{name}</AccordionTrigger>
            <AccordionContent>
              <Flex
                wrap
                gap="sm"
                css={{
                  padding: `${theme.space.md} ${theme.space.xxs}`,
                }}
              >
                {products.map((p) => {
                  const inList = productsInCurrentList?.includes(p.id)
                  return (
                    <button
                      className={css({
                        all: "unset",
                        borderRadius: theme.radii.sm,
                        "&:focus": {
                          outline: "1px solid",
                          outlineColor: theme.colors.solid,
                        },
                      }).toString()}
                      key={p.id}
                      onClick={() => {
                        if (inList)
                          removeProduct({
                            listId,
                            productId: p.id,
                          })
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
                    </button>
                  )
                })}
              </Flex>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )

  if (isError) return <Failure onRetry={refetch} />
  if (isLoading && isFetching) return <Loader />

  return <Empty />
}

const Failure: FC<{ onRetry(): void }> = ({ onRetry }) => {
  return (
    <Paper
      borderRadius="sm"
      css={{
        backgroundColor: theme.colors["ui-danger"],
        padding: theme.space.md,
        display: "flex",
        flexDirection: "column",
        gap: theme.space.sm,
      }}
    >
      <Text color="danger-low" role="alert">
        Une erreur s&apos;est produite
      </Text>
      <Button
        variant="outlined"
        size="small"
        colorScheme="accent"
        onClick={onRetry}
      >
        Réessayer
      </Button>
    </Paper>
  )
}

const Empty = () => {
  return <Text>Il n&apos;y a pas de produits.</Text>
}

export default Categories
