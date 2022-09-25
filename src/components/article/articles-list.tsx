import type { FC } from "react"

import Flex from "../common/flex"
import Paper from "../common/paper"
import Text from "../common/text"
import { theme } from "src/styles/theme/stitches.config"
import { useGetArticlesQuery } from "src/store/api/article.api.slice"
import Loader from "src/components/common/loader"

const ArticleList: FC = () => {
  const { data: articles, isError, isLoading } = useGetArticlesQuery()

  if (isError)
    return (
      <Text color="danger-low" role="alert">
        Une erreur s&apos;est produite
      </Text>
    )
  if (typeof articles === "undefined" || isLoading) return <Loader />
  if (articles.length === 0) return <Text>Il n&apos;y a pas de produits.</Text>
  return (
    <Flex
      as="ul"
      direction="column"
      gap="sm"
      css={{
        listStyleType: "none",
      }}
    >
      {articles
        ? articles.map(({ id, name }) => {
            return (
              <Paper
                bordered={false}
                key={id}
                borderRadius="md"
                css={{
                  padding: theme.space.md,
                  width: "100%",
                  minHeight: 75,
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.space.sm,
                  backgroundColor: theme.colors.ui,
                  transition: "all 200ms ease-in-out",
                  borderLeft: "5px solid",
                  borderLeftColor: theme.colors.solid,
                  "&:hover": {
                    boxShadow: theme.shadows.medium,
                    backgroundColor: theme.colors["ui-hovered"],
                  },
                }}
                as="li"
              >
                <Text>{name}</Text>
              </Paper>
            )
          })
        : null}
    </Flex>
  )
}

export default ArticleList
