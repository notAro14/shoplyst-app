import type { FC } from "react"

import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import CategoryAndProduct from "src/components/category-and-product"

const IndexPage: FC = () => {
  return (
    <>
      <SEO title="Shoplyst | Do your shopping with style" />
      <Heading as="h1" variant="h1">
        Tous les produits
      </Heading>
      <Spacer size="xs" />
      <Text>Prépare tes courses en ajoutant des produits à ta liste.</Text>
      <Spacer />
      <CategoryAndProduct />
      <Spacer />
    </>
  )
}

export default IndexPage
