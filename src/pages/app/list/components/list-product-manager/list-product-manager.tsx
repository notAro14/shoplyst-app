import { FC } from "react"
import type { ArticleStatus, Category, Product } from "@prisma/client"
import { theme, css } from "src/stitches.config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
import ProductInsideCategory from "src/components/categories/product-inside-category"

const flex = css({
  padding: `${theme.space.md} ${theme.space.xxs}`,
})()

type Products = {
  product: Product
  status: ArticleStatus
}[]

const ListProductManager: FC<{
  products: Products
  listId: string
  categories?: (Category & {
    products: Product[]
  })[]
}> = ({ products, listId, categories }) => {
  if (!categories) return null

  const productsEnlisted = products.map(({ product: { id } }) => id)
  const isProductEnlisted = (product: Product) =>
    productsEnlisted.includes(product.id)

  return (
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
              <Flex wrap gap="sm" className={flex}>
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
  )
}

export default ListProductManager
