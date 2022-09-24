import type { FC } from "react"

import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"

const IndexPage: FC = () => {
  return (
    <>
      <SEO title="Shoply | Do your shopping with style" />
      <Heading as="h1" variant="h1">
        Quick list
      </Heading>
    </>
  )
}

export default IndexPage
