import ProductForm from "src/components/ProductForm"
import { SEO } from "src/components/common"
import { Fragment } from "react"
import Link from "next/link"
import { Anchor } from "src/components/common"
import { withAppShell } from "src/components/app-shell"
import { ArrowLeftIcon } from "src/components/common/icons"

function Page() {
  return (
    <Fragment>
      <SEO title="Shoplyst | Ajouter un produit" />
      <Link legacyBehavior passHref href="/products">
        <Anchor>
          <ArrowLeftIcon />
          Voir tous les produits
        </Anchor>
      </Link>
      <br />
      <ProductForm />
    </Fragment>
  )
}
export default withAppShell(Page)
