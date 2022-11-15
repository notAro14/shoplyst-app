import { FC } from "react"
import type { Product, ArticleStatus } from "@prisma/client"

import { LazyLoader } from "src/components/common/loader"
import { trpc } from "src/utils/trpc"
import { Dialog } from "src/components/common/dialog"
import Spacer from "src/components/common/spacer"
import Button from "src/components/common/button"
import * as styles from "./styles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
import ProductInsideCategory from "src/components/categories/product-inside-category"
import { theme } from "src/stitches.config"

type Products = {
  product: Product
  status: ArticleStatus
}[]

const AddRemoveProductDialog: FC<{
  listName: string
  isOpen: boolean
  onDismiss(): void
  listId: string
  products: Products
}> = ({ products, listId, listName, isOpen, onDismiss }) => {
  const {
    data: categories,
    isLoading,
    isFetching,
  } = trpc.category.all.useQuery()

  const productsEnlisted = products.map(({ product: { id } }) => id)
  const isProductEnlisted = (product: Product) =>
    productsEnlisted.includes(product.id)

  if ((isLoading && isFetching) || !categories) return <LazyLoader />
  return (
    <Dialog
      title={listName}
      description="Tu peux ajouter ou retirer des produits de la liste"
      isOpen={isOpen}
      onDismiss={onDismiss}
      className={styles.dialog}
    >
      <Accordion collapsible type="single" defaultValue={categories[0].name}>
        {categories.map((category) => {
          const areSomeProductsEnlisted =
            category.products.some(isProductEnlisted)
          return (
            <AccordionItem key={category.id} value={category.name}>
              <AccordionTrigger
                css={{
                  borderColor: areSomeProductsEnlisted
                    ? theme.colors.solid
                    : undefined,
                }}
              >
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <Flex wrap gap="sm" className={styles.flex}>
                  {category.products.map((p) => (
                    <ProductInsideCategory
                      key={p.id}
                      product={p}
                      listId={listId}
                      inList={isProductEnlisted(p)}
                    />
                  ))}
                </Flex>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Spacer size="xl" />
      <Button fullWidth size="small" onClick={onDismiss}>
        Fermer
      </Button>
    </Dialog>
  )
}

export default AddRemoveProductDialog
