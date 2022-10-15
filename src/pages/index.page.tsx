import { useSession } from "next-auth/react"

import Text from "src/components/common/text"
import SEO from "src/components/common/seo/seo"
import type { NextPageWithLayout } from "src/types/next"
import Spacer from "src/components/common/spacer"
import { CtaLink } from "src/components/common/cta"
import Heading from "src/components/common/heading"

const IndexPage: NextPageWithLayout = () => {
  const { status } = useSession()
  return (
    <>
      <SEO title="Shoplyst | Application de listes de courses" />
      <Heading css={{ lineHeight: 1.3 }} as="h1" variant="h1">
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
      {status !== "loading" && (
        <CtaLink href="/app/my-lists">
          {status === "authenticated" && "Accéder à mes listes"}
          {status === "unauthenticated" && "Commencer"}
        </CtaLink>
      )}
    </>
  )
}

export default IndexPage
