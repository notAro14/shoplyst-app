import { FC } from "react"
import {
  CloseBtn,
  Dialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "src/components/common/dialog"
import Categories from "src/components/categories"
import type { ArticleStatus, Product, Category } from "@prisma/client"
import Spacer from "src/components/common/spacer"
import Heading from "src/components/common/heading"
import Button from "src/components/common/button"

type Products = {
  product: Product
  status: ArticleStatus
}[]

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

export default AddRemoveDialog
