import { FC } from "react"
import produce from "immer"
import toast from "react-hot-toast"
import type {
  List as IList,
  Product,
  ArticleStatus,
  ProductsOnLists,
  Category,
} from "@prisma/client"
import NextLink from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import useAutoanimate from "src/hooks/use-autoanimate"
import {
  CloseBtn,
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "src/components/common/dialog"
import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import Paper from "src/components/common/paper"
import Button from "src/components/common/button"
import { useDisclosure } from "src/hooks/use-disclosure"
import { theme, css } from "src/styles/theme/stitches.config"
import { trpc } from "src/utils/trpc"
import { ShoppingBagIcon } from "src/components/common/icons"
import Categories from "src/components/categories"
import { useIsRestoring } from "@tanstack/react-query"
import Link from "src/components/common/link"
import { TextEllipsed } from "src/components/common/ellipsed"

type Products = {
  product: Product
  status: ArticleStatus
}[]

interface Props {
  list: IList & {
    products: Products
  }
}

const ProductList: FC<{ products: Products; listId: string }> = ({
  products,
  listId: id,
}) => {
  return (
    <Flex
      ref={useAutoanimate<HTMLUListElement>()}
      as="ul"
      gap="sm"
      direction="column"
      css={{ listStyleType: "none", alignItems: "stretch" }}
    >
      {products
        .filter(({ status }) => status === "READY")
        .map(({ product: p, status }) => {
          return (
            <ProductInsideList p={p} status={status} key={p.id} listId={id} />
          )
        })}
      {products
        .filter(({ status }) => status === "PURCHASED")
        .map(({ product: p, status }) => {
          return (
            <ProductInsideList p={p} status={status} key={p.id} listId={id} />
          )
        })}
    </Flex>
  )
}

const AddRemoveDialog: FC<{
  isOpen: boolean
  onClose(): void
  products: Products
  listId: string
  categories?: (Category & {
    products: Product[]
  })[]
}> = ({ isOpen, onClose, products, listId: id, categories }) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <StyledDialogContent
        css={{
          height: 500,
          overflow: "auto",
          overscrollBehaviorY: "contain",
          scrollbarGutter: "stable",
        }}
      >
        <CloseBtn />
        <StyledDialogTitle asChild>
          <Heading variant="h2" as="h2">
            Ajouter/Retirer un produit
          </Heading>
        </StyledDialogTitle>
        <Spacer />
        <Spacer />
        {categories ? (
          <Categories
            productsInCurrentList={products.map(({ product: { id } }) => id)}
            listId={id}
            categories={categories}
          />
        ) : null}
        <Spacer />
        <Button
          fullWidth
          size="small"
          onClick={onClose}
          colorScheme="accent"
          css={{ marginTop: "auto" }}
        >
          Fermer
        </Button>
      </StyledDialogContent>
    </Dialog>
  )
}

const List: FC<Props> = ({ list: { name, products, id, description } }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    data: categories,
    isLoading,
    isFetching,
  } = trpc.category.all.useQuery()
  const isRestoring = useIsRestoring()

  return (
    <>
      <AddRemoveDialog
        categories={categories}
        isOpen={isOpen}
        onClose={onClose}
        listId={id}
        products={products}
      />
      <NextLink passHref href="/app/my-lists">
        <Link
          css={{
            display: "flex",
            alignItems: "center",
            gap: theme.space.sm,
          }}
        >
          <ArrowLeftIcon /> Mes listes de course
        </Link>
      </NextLink>
      <Spacer />
      <Spacer />
      <Heading
        css={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        title={name}
        as="h2"
        variant="h2"
      >
        {name}
      </Heading>
      <Spacer size="xxs" />
      <TextEllipsed
        title={description || undefined}
        color="functional-low"
        css={{ maxLine: 3, lineHeight: 1.65, userSelect: "none" }}
        fontSize="md"
      >
        {description || "Aucune description"}
      </TextEllipsed>
      <Spacer />
      {products?.length ? (
        <>
          <ProductList listId={id} products={products} />
          <Spacer />
          <Spacer />
          <Text fontSize="sm" as="em" css={{ userSelect: "none" }}>
            Clique sur un produit pour le mettre dans ton caddie
          </Text>
          <Spacer />
          <Button
            fullWidth
            size="small"
            onClick={onOpen}
            colorScheme="accent"
            variant="outlined"
            disabled={(isLoading && isFetching) || isRestoring}
          >
            Ajouter / Retirer
          </Button>
        </>
      ) : null}
      {products?.length === 0 ? (
        <>
          <Text fontSize="sm" as="em">
            Ta liste est vide
          </Text>
          <Spacer />
          <Button
            fullWidth
            size="small"
            onClick={onOpen}
            colorScheme="accent"
            disabled={(isLoading && isFetching) || isRestoring}
          >
            Ajouter des produits
          </Button>
        </>
      ) : null}
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
            noLineHeight
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

export default List
