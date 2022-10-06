import { FC } from "react"
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons"
import toast from "react-hot-toast"
import produce from "immer"

import type { ProductsOnLists, Product } from "@prisma/client"
import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import { trpc } from "src/utils/trpc"
import Flex from "src/components/common/flex"
import { theme, styled } from "src/styles/theme/stitches.config"
import IconButton from "src/components/common/icon-button"
import Paper from "src/components/common/paper"
import Loader from "src/components/common/loader"
import {
  Dialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledCloseBtn,
} from "src/components/common/dialog"
import Categories from "src/components/categories"
import useDisclosure from "src/hooks/use-disclosure"

const ProductButton = styled("button", {
  all: "unset",
  borderRadius: theme.radii.sm,
  "&:focus": {
    outline: "1px solid",
    outlineColor: theme.colors.solid,
  },
})

const ShoppingBagIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  )
}

const IndexPage: FC = () => {
  // TODO: temporary
  const { data, isLoading, isFetching } = trpc.list.first.useQuery()
  const { data: categories } = trpc.category.all.useQuery()
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <SEO title="Shoplyst | Fais tes courses avec style" />
      {isLoading && isFetching ? (
        <Loader />
      ) : data ? (
        <>
          <Dialog isOpen={isOpen} onDismiss={onClose}>
            <StyledDialogContent>
              <StyledDialogTitle asChild>
                <Heading variant="h2" as="h2">
                  {data.name}
                </Heading>
              </StyledDialogTitle>
              <StyledCloseBtn>
                <Cross1Icon />
              </StyledCloseBtn>
              <Spacer />
              {categories ? (
                <Categories categories={categories} listId={data.id} />
              ) : null}
            </StyledDialogContent>
          </Dialog>
          <Flex gap="md" align="center">
            <Heading as="h2" variant="h2">
              {data.name}
            </Heading>
            <IconButton
              onClick={onOpen}
              rounded
              aria-label="Modifier la liste"
              variant="ghost"
            >
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
        <Text>Such empty. Create a list here.</Text>
      )}
    </>
  )
}

export default IndexPage

function useProductStatusMutation() {
  const utils = trpc.useContext()
  return trpc.list.updateProductStatus.useMutation({
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
    <ProductButton onClick={onClick}>
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
        {status === "PURCHASED" && <ShoppingBagIcon />}
        {/*{status === "READY" && <DrawingPinIcon />}*/}
        <Text
          noLineHeight
          color="functional"
          fontSize="lg"
          css={{ color: "inherit", fontSize: "inherit" }}
        >
          {p.name}
        </Text>
      </Paper>
    </ProductButton>
  )
}
