import type { FC } from "react"

import type { Category, Product } from "@prisma/client"
import { theme } from "src/styles/theme/stitches.config"
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
import ProductInsideCategory from "./product-inside-category"

const Categories: FC<{
  productsInCurrentList: number[]
  listId: string
  categories: (Category & {
    products: Product[]
  })[]
}> = ({ productsInCurrentList, listId, categories }) => {
  return (
    <Accordion collapsible type="single" defaultValue={categories[0].name}>
      {categories?.map(({ id, name, products }) => {
        const containsProductInList = products.some((p) => {
          return productsInCurrentList?.includes(p.id)
        })
        return (
          <AccordionItem key={id} value={name}>
            <AccordionTrigger
              css={{
                borderColor: containsProductInList
                  ? theme.colors["solid-accent"]
                  : undefined,
              }}
            >
              {name}
            </AccordionTrigger>
            <AccordionContent>
              <Flex
                wrap
                gap="sm"
                css={{
                  padding: `${theme.space.md} ${theme.space.xxs}`,
                }}
              >
                {products.map((p) => (
                  <ProductInsideCategory
                    key={p.id}
                    product={p}
                    listId={listId}
                    inList={productsInCurrentList?.includes(p.id)}
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

export default Categories
