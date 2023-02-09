import ProductForm from "src/components/ProductForm"
import { SEO } from "src/components/common"
import { Fragment } from "react"
import NextLink from "next/link"
import { Link } from "src/components/common/link"
import { withAppShell } from "src/components/app-shell"

function Page() {
  return (
    <Fragment>
      <SEO title="Shoplyst | Ajouter un produit" />
      <NextLink legacyBehavior passHref href="/products">
        <Link>Voir tous les produits</Link>
      </NextLink>
      <ProductForm />
    </Fragment>
  )
}
export default withAppShell(Page)
