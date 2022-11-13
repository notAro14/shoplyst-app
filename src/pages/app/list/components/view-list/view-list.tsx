import { useRouter } from "next/router"
import { FC, Fragment, useCallback } from "react"
import produce from "immer"
import toast from "react-hot-toast"
import type {
  ArticleStatus,
  List as IList,
  Product,
  ProductsOnLists,
} from "@prisma/client"
import NextLink from "next/link"
import {
  ArrowLeftIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  Share1Icon,
  TrashIcon,
} from "src/components/common/icons"

import { Dialog } from "src/components/common/dialog"
import useAutoanimate from "src/hooks/use-autoanimate"
import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import Paper from "src/components/common/paper"
import Button from "src/components/common/button"
import { useDisclosure } from "src/hooks/use-disclosure"
import { css, theme } from "src/stitches.config"
import { trpc } from "src/utils/trpc"
import { ShoppingBagIcon } from "src/components/common/icons"
import { useIsRestoring } from "@tanstack/react-query"
import Link from "src/components/common/link"
import { TextEllipsed } from "src/components/common/ellipsed"
import IconButton from "src/components/common/icon-button"
import Box from "src/components/common/box"
import ListProductManager from "../list-product-manager"
import ListForm from "src/components/list/list-form"

const dialogContent = css({
  height: 500,
  overflow: "auto",
  overscrollBehaviorY: "contain",
  scrollbarGutter: "stable",
})()

type Products = {
  product: Product
  status: ArticleStatus
}[]

interface Props {
  list: IList & {
    products: Products
  }
}

const DeleteList: FC<{ listId: string }> = ({ listId }) => {
  const utils = trpc.useContext()
  const { push } = useRouter()
  const { mutate: deleteList, isLoading } = trpc.list.delete.useMutation({
    async onMutate(updated) {
      await utils.list.all.cancel()
      //await utils.list.allShared.cancel()
      const all = utils.list.all.getData({ isArchived: false })
      const archived = utils.list.all.getData({ isArchived: true })
      const shared = utils.list.allShared.getData()
      utils.list.all.setData((prev) => prev?.filter((l) => l.id !== updated), {
        isArchived: false,
      })
      utils.list.all.setData((prev) => prev?.filter((l) => l.id !== updated), {
        isArchived: true,
      })
      utils.list.allShared.setData((prev) =>
        prev?.filter((l) => l.list.id !== listId)
      )
      toast.success("Liste supprimée")
      push("/app/my-lists")
      return { all, archived, shared }
    },
    onError(_error, _variables, ctx) {
      utils.list.all.setData(ctx?.all, { isArchived: false })
      utils.list.all.setData(ctx?.archived, { isArchived: true })
      utils.list.allShared.setData(ctx?.shared)
      toast.error("Une erreur s'est produite")
    },
    onSettled() {
      utils.list.all.invalidate({ isArchived: false })
      utils.list.all.invalidate({ isArchived: true })
      utils.list.allShared.invalidate()
    },
  })
  const onClick = useCallback(() => {
    deleteList(listId)
  }, [deleteList, listId])
  return (
    <IconButton
      title="Supprimer la liste"
      rounded
      variant="ghost"
      onClick={() => {
        const yes = confirm("La liste va être supprimée")
        if (yes) onClick()
      }}
      disabled={isLoading}
    >
      <TrashIcon />
    </IconButton>
  )
}

const ArchiveList: FC<{ listId: string; disabled: boolean }> = ({
  listId,
  disabled,
}) => {
  const utils = trpc.useContext()
  const { mutate: archiveList, isLoading } = trpc.list.archive.useMutation({
    async onMutate() {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData((prev) => {
        return produce(prev, (draft) => {
          if (!draft || !prev) return
          prev.isArchived = true
        })
      })
      return { previous }
    },
    onError(_error, _updated, ctx) {
      utils.list.find.setData(ctx?.previous, listId)
      toast.error("Une erreur s'est produite")
    },
    onSettled() {
      utils.list.find.invalidate(listId)
      toast.success("Liste archivée")
    },
  })
  const onClick = useCallback(() => {
    archiveList(listId)
  }, [listId, archiveList])

  return (
    <Button
      fullWidth
      size="small"
      onClick={onClick}
      variant="filled"
      disabled={isLoading || disabled}
    >
      Terminer la course
    </Button>
  )
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

const List: FC<Props> = ({
  list: { name, products, id, description, isArchived },
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onClose: onEditClose,
    onOpen: onEditOpen,
  } = useDisclosure()
  const {
    data: categories,
    isLoading,
    isFetching,
  } = trpc.category.all.useQuery()
  const isRestoring = useIsRestoring()
  const isShoppingDone =
    products?.length && products.every((p) => p.status === "PURCHASED")
  const isListEmpty = products?.length === 0
  const isThereSomeProduct = products?.length !== 0

  return (
    <Fragment>
      <EditListDialog
        listId={id}
        isOpen={isEditOpen}
        onDismiss={onEditClose}
        listName={name}
        listDescription={description}
      />

      <Dialog
        title={name}
        description="Tu peux ajouter ou retirer des produits de la liste"
        isOpen={isOpen}
        onDismiss={onClose}
        className={dialogContent}
      >
        <ListProductManager
          categories={categories}
          listId={id}
          products={products}
        />
        <Spacer size="xl" />
        <Button fullWidth size="small" onClick={onClose}>
          Fermer
        </Button>
      </Dialog>

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
      <Spacer size="lg" />
      {isArchived && (
        <Text
          fontSize="sm"
          as="em"
          color="warning-low"
          css={{
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: theme.space.xs,
          }}
        >
          <ExclamationTriangleIcon />
          Archivée
        </Text>
      )}
      <Spacer />
      <Heading.H2
        css={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
        title={name}
      >
        {name}
      </Heading.H2>
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
      <Flex gap="xs">
        {isArchived === false && (
          <IconButton
            title="Bientôt disponible"
            disabled
            rounded
            variant="ghost"
          >
            <Share1Icon />
          </IconButton>
        )}
        <IconButton
          onClick={onEditOpen}
          title="Modifier la liste"
          rounded
          variant="ghost"
        >
          <Pencil1Icon />
        </IconButton>
        <DeleteList listId={id} />
      </Flex>
      <Spacer />
      {isThereSomeProduct && isArchived === false && (
        <Text
          fontSize="sm"
          as="em"
          css={{
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: theme.space.xs,
          }}
        >
          <InfoCircledIcon />
          Clique sur un produit pour le mettre dans ton caddie
        </Text>
      )}
      {isThereSomeProduct && isArchived && (
        <Flex
          as="ul"
          direction="column"
          gap="sm"
          css={{
            listStyleType: "none",
          }}
        >
          {products.map(({ product: p, status }) => {
            return (
              <Box as="li" key={p.id}>
                <Text
                  css={{
                    color: theme.colors["text-functional-low"],
                    fontSize: theme.fontSizes.sm,
                    display: "flex",
                    gap: theme.space.sm,
                    alignItems: "center",
                  }}
                >
                  {status === "PURCHASED" && <CheckIcon />}
                  {p.name}
                </Text>
              </Box>
            )
          })}
        </Flex>
      )}
      {isThereSomeProduct && isArchived === false ? (
        <Fragment>
          <Spacer />
          <ArchiveList
            disabled={!(isShoppingDone && isArchived === false)}
            listId={id}
          />
          <Spacer />
          <ProductList listId={id} products={products} />
          <Spacer size="xl" />
          <Button
            fullWidth
            size="small"
            onClick={onOpen}
            variant="outlined"
            disabled={(isLoading && isFetching) || isRestoring}
          >
            Ajouter / Retirer
          </Button>
        </Fragment>
      ) : null}
      {isListEmpty && isArchived === false ? (
        <Fragment>
          <Text fontSize="sm" as="em">
            Ta liste est vide
          </Text>
          <Spacer />
          <Button
            fullWidth
            size="small"
            onClick={onOpen}
            disabled={(isLoading && isFetching) || isRestoring}
          >
            Ajouter des produits
          </Button>
        </Fragment>
      ) : null}
      <Spacer />
    </Fragment>
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

const EditListDialog: FC<{
  isOpen: boolean
  onDismiss(): void
  listName: string
  listDescription: string | null
  listId: string
}> = ({
  isOpen,
  onDismiss,
  listDescription: description,
  listName: name,
  listId,
}) => {
  const utils = trpc.useContext()
  const { mutate } = trpc.list.update.useMutation({
    async onSuccess() {
      await utils.list.find.invalidate(listId)
    },
    async onMutate(variables) {
      await utils.list.find.cancel(variables.id)
      const previous = utils.list.find.getData(variables.id)
      utils.list.find.setData((prev) => {
        return produce(prev, (draft) => {
          if (!draft) return
          draft.name = variables.name
          draft.description = variables.description ?? draft.description
        })
      }, variables.id)
      onDismiss()
      toast.success("Liste mise à jour")
      return { previous }
    },
    onError(_error, variables, context) {
      utils.list.find.setData(context?.previous, variables.id)
    },
    onSettled(_data, _error, variables) {
      utils.list.find.invalidate(variables.id)
    },
  })
  return (
    <Dialog title="Modifier la liste" isOpen={isOpen} onDismiss={onDismiss}>
      <ListForm
        defaultValues={{ name, description }}
        isSubmitting={false}
        onSubmit={(data) => {
          mutate({ id: listId, name: data.name, description: data.description })
        }}
        mode="UPDATE"
      />
    </Dialog>
  )
}

export default List
