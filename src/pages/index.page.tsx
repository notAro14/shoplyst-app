import type { FC } from "react"

import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Text from "src/components/common/text"
import { styled, theme } from "src/styles/theme/stitches.config"
import ArticleList from "src/components/article/articles-list"

const Spacer = styled("div", {
  display: "block",
  variants: {
    size: {
      xxs: {
        height: theme.space.xxs,
      },
      xs: {
        height: theme.space.xs,
      },
      sm: {
        height: theme.space.sm,
      },
      md: {
        height: theme.space.md,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

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
      <ArticleList />
      <Spacer />
    </>
  )
}

export default IndexPage
