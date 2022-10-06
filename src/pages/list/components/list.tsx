import { FC, useEffect } from "react"
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons"
import produce from "immer"
import toast from "react-hot-toast"
import type {
  List as IList,
  Product,
  ArticleStatus,
  ProductsOnLists,
} from "@prisma/client"

import {
  Dialog,
  StyledCloseBtn,
  StyledDialogContent,
  StyledDialogTitle,
} from "src/components/common/dialog"
import Flex from "src/components/common/flex"
import IconButton from "src/components/common/icon-button"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import Paper from "src/components/common/paper"
import { useDisclosure } from "src/hooks/use-disclosure"
import { theme, css } from "src/styles/theme/stitches.config"
import { trpc } from "src/utils/trpc"
import { ShoppingBagIcon } from "src/components/common/icons"
import Categories from "src/components/categories"

interface Props {
  list: IList & {
    products: {
      product: Product
      status: ArticleStatus
    }[]
  }
}

const List: FC<Props> = ({ list: { name, products, id } }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const prefetchCategories = trpc.useContext().category.all.prefetch
  useEffect(() => {
    const prefetch = async () => {
      await prefetchCategories()
    }
    prefetch()
  }, [prefetchCategories])

  return (
    <>
      <Dialog isOpen={isOpen} onDismiss={onClose}>
        <StyledDialogContent>
          <StyledDialogTitle asChild>
            <Heading variant="h2" as="h2">
              {name}
            </Heading>
          </StyledDialogTitle>
          <StyledCloseBtn>
            <Cross1Icon />
          </StyledCloseBtn>
          <Spacer />
          <Categories
            productsInCurrentList={products.map(({ product: { id } }) => id)}
            listId={id}
          />
        </StyledDialogContent>
      </Dialog>
      <Flex gap="md" align="center">
        <Heading as="h2" variant="h2">
          {name}
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
        {products?.map(({ product: p, status }) => {
          return (
            <ProductInsideList p={p} status={status} key={p.id} listId={id} />
          )
        })}
      </Flex>
      <Spacer />
    </>
  )
}

function useProductStatusMutation(listId: string) {
  const utils = trpc.useContext()
  return trpc.list.updateProductStatus.useMutation({
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
}

const ProductInsideList: FC<{
  p: Product
  status: ProductsOnLists["status"]
  listId: string
}> = ({ p, status, listId }) => {
  const { mutate } = useProductStatusMutation(listId)
  const onClick = async () => {
    return mutate({
      listId,
      productId: p.id,
      status: status === "PURCHASED" ? "READY" : "PURCHASED",
    })
  }
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
          minHeight: 50,
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

export default List
