import type { Product } from "@prisma/client"
import type { FC } from "react"
import produce from "immer"

import { css, theme } from "src/styles/theme/stitches.config"
import Box from "src/components/common/box"
import { CartIcon } from "src/components/common/icons"
import Paper from "src/components/common/paper"
import Text from "src/components/common/text"
import { trpc } from "src/utils/trpc"

interface Props {
  product: Product
  inList: boolean
  listId: string
}

const ProductInsideCategory: FC<Props> = ({ product: p, inList, listId }) => {
  const utils = trpc.useContext()
  const { mutate: addProduct } = trpc.list.addProduct.useMutation({
    async onMutate() {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData(
        (prev) =>
          produce(prev, (draft) => {
            if (!draft || !previous === null) return
            draft.products.push({
              product: p,
              status: "READY",
            })
            draft.products.sort((pA, pB) => {
              const {
                product: { name: A },
              } = pA
              const {
                product: { name: B },
              } = pB
              if (A < B) return -1
              else if (A > B) return 1
              return 0
            })
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
  const { mutate: removeProduct } = trpc.list.removeProduct.useMutation({
    async onMutate(variables) {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData(
        (prev) =>
          produce(prev, (draft) => {
            if (!draft || !previous === null) return
            draft.products = draft.products.filter(
              (p) => p.product.id !== variables.productId
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
}

export default ProductInsideCategory
