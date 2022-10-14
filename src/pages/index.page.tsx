import { useSession } from "next-auth/react"
import { PlusIcon, Share1Icon, ListBulletIcon } from "@radix-ui/react-icons"

import Text from "src/components/common/text"
import SEO from "src/components/common/seo/seo"
import type { NextPageWithLayout } from "src/types/next"
import Spacer from "src/components/common/spacer"
import Flex from "src/components/common/flex"
import { CartIcon } from "src/components/common/icons"
import { theme } from "src/styles/theme/stitches.config"
import type { FC, ReactNode } from "react"
import Box from "src/components/common/box"
import { CtaLink } from "src/components/common/cta"

const MarketingText: FC<{ children: ReactNode }> = ({ children }) => (
  <Text
    as="li"
    css={{
      display: "flex",
      alignItems: "center",
      lineHeight: 1,
      gap: theme.space.sm,
    }}
  >
    {children}
  </Text>
)

const IndexPage: NextPageWithLayout = () => {
  const { status } = useSession()
  return (
    <>
      <SEO title="Shoplyst | Application de listes de courses" />
      <Spacer />
      <Spacer />
      <Box css={{ margin: "0 auto", width: "fit-content" }}>
        <Flex
          direction="column"
          as="ul"
          css={{ listStyleType: "none" }}
          gap="lg"
        >
          <MarketingText>
            <ListBulletIcon /> Crée ta liste
          </MarketingText>
          <MarketingText>
            <PlusIcon /> Ajoute des articles
          </MarketingText>
          <MarketingText>
            <Share1Icon /> Partage
          </MarketingText>
          <MarketingText>
            <CartIcon /> Maîtrise ton caddie
          </MarketingText>
        </Flex>
        <Spacer />
        <Spacer />
        {status !== "loading" && (
          <CtaLink href="/app/my-lists">
            {status === "authenticated" && "Voir mes listes"}
            {status === "unauthenticated" && "Commencer"}
          </CtaLink>
        )}
      </Box>
    </>
  )
}

export default IndexPage
