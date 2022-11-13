import { FC, useCallback } from "react"
import type { Product, ProductsOnLists } from "@prisma/client"
import produce from "immer"

import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"
import Checkbox from "src/components/common/checkbox"

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
  const onChange = useCallback(
    async (checkedState: boolean) => {
      return mutate({
        listId,
        productId: p.id,
        status: checkedState ? "PURCHASED" : "READY",
      })
    },
    [mutate, listId, p.id]
  )
  return (
    <Checkbox
      checked={status === "PURCHASED"}
      label={p.name}
      name={p.name}
      id={String(p.id)}
      onChange={onChange}
    />
  )
}

export default ProductToggle
