import { Fragment } from "react"
import * as styles from "./styles"
import { CtaLink } from "src/components/common/cta"
import Heading from "src/components/common/heading"
import { LazyLoader } from "src/components/common/loader"
import type { NextPageWithLayout } from "src/types/next"
import SEO from "src/components/common/seo/seo"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import { useSession } from "next-auth/react"

const IndexPage: NextPageWithLayout = () => {
  const { status } = useSession()
  if (status === "loading") return <LazyLoader />

  return (
    <Fragment>
      <SEO title="Shoplyst | Application de listes de courses" />
      <Heading className={styles.heading} as="h1" variant="h1">
        Hello World
        <span role="img" aria-label="Hand symbol for victory">
          &#9996;
        </span>
      </Heading>
      <Spacer size="xxs" />
      <Text>
        Crée ta liste de course, ajoute des produits, partage ta liste et
        maîtrise ton caddie.
      </Text>
      <Spacer />
      <CtaLink href="/app/my-lists">
        {status === "authenticated" && "Accéder à mes listes"}
        {status === "unauthenticated" && "Commencer"}
      </CtaLink>
    </Fragment>
  )
}

export default IndexPage
