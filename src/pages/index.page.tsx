import { FC } from "react"
import { Pencil1Icon, CheckIcon } from "@radix-ui/react-icons"
import toast from "react-hot-toast"
import produce from "immer"

import type { ProductsOnLists, Product } from "@prisma/client"
import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import { trpc } from "src/utils/trpc"
import Flex from "src/components/common/flex"
import { theme } from "src/styles/theme/stitches.config"
import IconButton from "src/components/common/icon-button"
import Paper from "src/components/common/paper"
import Loader from "src/components/common/loader"

const IndexPage: FC = () => {
  const { data } = trpc.list.first.useQuery()

  return (
    <>
      <SEO title="Shoplyst | Fais tes courses avec style" />
      {data ? (
        <>
          <Flex gap="md" align="center">
            <Heading as="h2" variant="h2">
              {data.name}
            </Heading>
            <IconButton rounded aria-label="Modifier la liste" variant="ghost">
              <Pencil1Icon />
            </IconButton>
          </Flex>
          <Spacer />
          <Flex as="ul" gap="md" direction="column">
            {data.products?.map(({ product: p, status }) => {
              return (
                <ProductInsideList
                  p={p}
                  status={status}
                  key={p.id}
                  listId={data.id}
                />
              )
            })}
          </Flex>
          <Spacer />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default IndexPage

function useProductStatusMutation() {
  const utils = trpc.useContext()
  return trpc.list.updateProductStatus.useMutation({
    //onSuccess() {
    //  return utils.list.first.invalidate()
    //},
    onMutate: async (updated) => {
      await utils.list.first.cancel()
      const previous = utils.list.first.getData()
      utils.list.first.setData((prev) => {
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
      })
      return { previous }
    },
    onError(_error, _updated, ctx) {
      toast.error("Oups, une erreur s'est produite")
      utils.list.first.setData(ctx?.previous)
    },
    onSettled() {
      utils.list.first.invalidate()
    },
  })
}

const ProductInsideList: FC<{
  p: Product
  status: ProductsOnLists["status"]
  listId: string
}> = ({ p, status, listId }) => {
  const { mutate } = useProductStatusMutation()
  const onClick = async () => {
    return mutate({
      listId: listId,
      productId: p.id,
      status: status === "PURCHASED" ? "READY" : "PURCHASED",
    })
  }
  return (
    <button
      style={{
        all: "unset",
      }}
      onClick={onClick}
    >
      <Paper
        borderRadius="sm"
        css={{
          padding: theme.space.md,
          backgroundColor: theme.colors.ui,
          display: "flex",
          alignItems: "center",
          border: "none",
          gap: theme.space.sm,
          ...(status === "PURCHASED"
            ? {
                boxShadow: "unset",
                backgroundColor: theme.colors["bg-alt"],
                color: theme.colors["text-functional-low"],
                fontSize: theme.fontSizes.sm,
              }
            : undefined),
        }}
      >
        {status === "PURCHASED" && <CheckIcon />}
        <Text
          noLineHeight
          color="functional"
          fontSize="lg"
          css={{ color: "inherit", fontSize: "inherit" }}
        >
          {p.name}
        </Text>
      </Paper>
    </button>
  )
}
