import type { FC } from "react"
import NextLink from "next/link"
import type { Product, ArticleStatus } from "@prisma/client"

import { theme } from "src/styles/theme/stitches.config"
import Paper from "src/components/common/paper"
import TextEllipsed from "src/components/common/text-ellipsed"
import Link from "src/components/common/link"

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
    <>
      {lists?.map((l) => {
        return (
          <NextLink href={`/app/list/${l.id}`} key={l.id} passHref>
            <Link>
              <Paper
                as="span"
                css={{
                  padding: `${theme.space.sm} ${theme.space.sm}`,
                  width: "100%",
                  transition: "box-shadow 150ms ease-in-out",
                  backgroundColor: theme.colors.ui,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.colors["ui-hovered"],
                    boxShadow: theme.shadows.medium,
                  },
                }}
                //bordered
                borderRadius="sm"
                elevation="low"
              >
                <TextEllipsed as="span" fontSize="md">
                  {l.name}
                </TextEllipsed>
              </Paper>
            </Link>
          </NextLink>
        )
      })}
    </>
  )
}

export default MyLists
