import { FC } from "react"
import type { Product, ProductsOnLists } from "@prisma/client"
import produce from "immer"

import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"
import Paper from "src/components/common/paper"
import Text from "src/components/common/text"
import { css, theme } from "src/stitches.config"
import { ShoppingBagIcon } from "src/components/common/icons"

const ProductToggle: FC<{
  p: Product
  status: ProductsOnLists["status"]
  listId: string
}> = ({ p, status, listId }) => {
  const utils = trpc.useContext()
  const { mutate } = trpc.list.updateProductStatus.useMutation({
    onMutate: async (updated) => {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData((prev) => {
        return produce(prev, (draft) => {
          if (typeof draft === "undefined" || draft === null) return
          const products = produce(prev?.products, (innerDraft) => {
            if (typeof innerDraft === "undefined") return
            const idx = innerDraft.findIndex(
              (p) => p.product.id === updated.productId
            )
            innerDraft[idx].status = updated.status
          })
          if (products) draft.products = products
        })
      }, listId)
      return { previous }
    },
    onError(_error, _updated, ctx) {
      toast.error("Oups, une erreur s'est produite")
      utils.list.find.setData(ctx?.previous, listId)
    },
    onSettled() {
      utils.list.find.invalidate(listId)
    },
  })
  const onClick = async () => {
    return mutate({
      listId,
      productId: p.id,
      status: status === "PURCHASED" ? "READY" : "PURCHASED",
    })
  }
  return (
    <li>
      <button
        className={css({
          all: "unset",
          borderRadius: theme.radii.sm,
          width: "100%",
          "&:focus": {
            outline: "1px solid",
            outlineColor: theme.colors.solid,
          },
        })()}
        onClick={onClick}
      >
        <Paper
          borderRadius="sm"
          as="span"
          css={{
            padding: theme.space.md,
            backgroundColor: theme.colors.ui,
            display: "flex",
            alignItems: "center",
            border: "none",
            minHeight: 50,
            gap: theme.space.sm,
            boxShadow: theme.shadows.low,
            transition: "box-shadow 200ms ease-in-out",
            "&:hover": {
              boxShadow: theme.shadows.medium,
              cursor: "pointer",
            },
            ...(status === "PURCHASED"
              ? {
                  boxShadow: "unset",
                  backgroundColor: theme.colors["bg-alt"],
                  color: theme.colors["text-functional-low"],
                  fontSize: theme.fontSizes.sm,
                  "&:hover": {
                    boxShadow: theme.shadows.low,
                    cursor: "pointer",
                  },
                }
              : undefined),
          }}
        >
          {status === "PURCHASED" && <ShoppingBagIcon />}
          <Text
            variant="text"
            as="span"
            color="functional"
            fontSize="lg"
            css={{ color: "inherit", fontSize: "inherit" }}
          >
            {p.name}
          </Text>
        </Paper>
      </button>
    </li>
  )
}

export default ProductToggle
