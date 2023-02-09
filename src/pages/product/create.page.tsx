import ProductForm from "src/components/ProductForm"
import { SEO } from "src/components/common"
import { Fragment } from "react"

export default function Page() {
  return (
    <Fragment>
      <SEO title="Shoplyst | Ajouter un produit" />
      <ProductForm />
    </Fragment>
  )
}
