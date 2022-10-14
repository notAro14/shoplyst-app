import type { FC } from "react"
import NextLink from "next/link"
import type { Product, ArticleStatus } from "@prisma/client"

import { theme } from "src/styles/theme/stitches.config"
import Paper from "src/components/common/paper"
import TextEllipsed from "src/components/common/text-ellipsed"
import Text from "src/components/common/text"
import Link from "src/components/common/link"
import Spacer from "src/components/common/spacer"
import Flex from "src/components/common/flex"
import useAutoanimate from "src/hooks/use-autoanimate"

interface Props {
  lists: {
    products: {
      product: Product
      status: ArticleStatus
    }[]
    name: string
    id: string
  }[]
}

const MyLists: FC<Props> = ({ lists }) => {
  return (
    <Flex
      ref={useAutoanimate<HTMLUListElement>()}
      direction="column"
      gap="lg"
      as="ul"
      css={{ listStyleType: "none" }}
    >
      {lists?.map(({ id, name, products }) => {
        const { length } = products
        return (
          <li key={id}>
            <NextLink href={`/app/list/${id}`} passHref>
              <Link>
                <Paper
                  as="span"
                  bordered
                  css={{
                    padding: `${theme.space.sm} ${theme.space.sm}`,
                    width: "100%",
                    transition: "box-shadow 150ms ease-in-out",
                    "&:hover": {
                      cursor: "pointer",
                      boxShadow: theme.shadows.medium,
                    },
                  }}
                  borderRadius="sm"
                  elevation="low"
                >
                  <TextEllipsed as="span" fontSize="lg">
                    {name}
                  </TextEllipsed>
                  <Spacer size="xxs" />
                  <Text as="small" fontSize="sm" color="functional-low">
                    {length > 0 &&
                      (length > 1 ? `${length} produits` : `${length} produit`)}
                    {length === 0 && "Vide"}
                  </Text>
                </Paper>
              </Link>
            </NextLink>
          </li>
        )
      })}
    </Flex>
  )
}

export default MyLists
