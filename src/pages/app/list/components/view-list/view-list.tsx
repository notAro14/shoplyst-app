import { FC, Fragment, useEffect } from "react"
import type { ArticleStatus, List as IList, Product } from "@prisma/client"
import NextLink from "next/link"
import {
  ArrowLeftIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  Share1Icon,
} from "src/components/common/icons"

import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import Button from "src/components/common/button"
import { useDisclosure } from "src/hooks/use-disclosure"
import { trpc } from "src/utils/trpc"
import { useIsRestoring } from "@tanstack/react-query"
import Link from "src/components/common/link"
import { TextEllipsed } from "src/components/common/ellipsed"
import IconButton from "src/components/common/icon-button"
import Box from "src/components/common/box"
import DeleteList from "../delete-list"
import ArchiveList from "../archive-list"
import EditListDialog from "../edit-list-dialog"
import ProductToggle from "../product-toggle"
import AddRemoveProductDialog from "../add-remove-product-dialog"
import * as styles from "./styles"
import AnimatedList from "src/components/common/animated-list"

type Products = {
  product: Product
  status: ArticleStatus
}[]

interface Props {
  list: IList & {
    products: Products
  }
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

  const isRestoring = useIsRestoring()
  const isShoppingDone =
    products?.length && products.every((p) => p.status === "PURCHASED")
  const isListEmpty = products?.length === 0
  const isThereSomeProduct = products?.length !== 0
  const { prefetch } = trpc.useContext().category.all

  useEffect(() => {
    prefetch()
  }, [prefetch])

  return (
    <Fragment>
      <EditListDialog
        listId={id}
        isOpen={isEditOpen}
        onDismiss={onEditClose}
        listName={name}
        listDescription={description}
      />

      <AddRemoveProductDialog
        isOpen={isOpen}
        onDismiss={onClose}
        listName={name}
        products={products}
        listId={id}
      />

      <NextLink passHref href="/app/my-lists">
        <Link className={styles.link}>
          <ArrowLeftIcon /> Mes listes de course
        </Link>
      </NextLink>
      <Spacer size="lg" />
      {isArchived && (
        <Text
          fontSize="sm"
          as="em"
          color="warning-low"
          className={styles.archivedCaption}
        >
          <ExclamationTriangleIcon />
          Course terminée
        </Text>
      )}
      <Spacer />
      <Heading.H2 className={styles.listName} title={name}>
        {name}
      </Heading.H2>
      <Spacer size="xxs" />
      <TextEllipsed
        title={description || undefined}
        color="functional-low"
        className={styles.listDescription}
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
      {isThereSomeProduct && isArchived === true && (
        <Flex
          as="ul"
          direction="column"
          gap="sm"
          className={styles.productsContainer}
        >
          {products.map(({ product: p, status }) => {
            return (
              <Box as="li" key={p.id}>
                <Text className={styles.product}>
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
          <Text fontSize="sm" as="em" className={styles.infoCaption}>
            <InfoCircledIcon />
            Clique sur un produit pour le mettre dans ton caddie
          </Text>
          <Spacer />
          <ArchiveList
            disabled={!(isShoppingDone && isArchived === false)}
            listId={id}
          />
          <Spacer />
          <AnimatedList className={styles.animatedList}>
            {products
              .filter(({ status }) => status === "READY")
              .map(({ product: p, status }) => {
                return (
                  <ProductToggle p={p} status={status} key={p.id} listId={id} />
                )
              })}
            {products
              .filter(({ status }) => status === "PURCHASED")
              .map(({ product: p, status }) => {
                return (
                  <ProductToggle p={p} status={status} key={p.id} listId={id} />
                )
              })}
          </AnimatedList>
          <Spacer size="xl" />
          <Button
            fullWidth
            size="small"
            onClick={onOpen}
            variant="outlined"
            disabled={isRestoring}
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
            disabled={isRestoring}
          >
            Ajouter des produits
          </Button>
        </Fragment>
      ) : null}
      <Spacer />
    </Fragment>
  )
}

export default List
