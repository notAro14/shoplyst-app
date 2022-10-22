import { Share1Icon } from "@radix-ui/react-icons"
import { useIsRestoring } from "@tanstack/react-query"
import { FC } from "react"
import NextLink from "next/link"

import Box from "src/components/common/box"
import Loader from "src/components/common/loader"
import type { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import { ListIcon } from "src/components/common/icons"
import SEO from "src/components/common/seo"
import PublicLayout from "src/layout/public.layout"
import AppShell from "src/components/app-shell"
import CreateList from "./components/create-list/create-list"
import PageHeading from "./components/page-heading"
import { TextEllipsed } from "src/components/common/ellipsed"
import Text from "src/components/common/text"
import Link from "src/components/common/link"
import Spacer from "src/components/common/spacer"
import {
  StyledPaper,
  StyledDescription,
  StyledQuantityIndication,
  StyledUList,
} from "./index.styles"
import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import { theme } from "src/styles/theme/stitches.config"

const SharedList = () => {
  const { data: sharedLists } = trpc.list.allShared.useQuery()

  return (
    <>
      <PageHeading icon={<Share1Icon />} heading="Partagées avec moi" />
      <Spacer size="xxs" />
      {sharedLists?.length === 0 ? (
        <Text>Tu n&apos;as pas encore de listes partagées</Text>
      ) : null}
      {sharedLists?.length ? (
        <Flex direction="column" css={{ userSelect: "none" }}>
          {sharedLists.map(({ list: l }) => {
            return (
              <Box
                key={l.id}
                css={{
                  border: "1px solid",
                  borderColor: theme.colors["border-gray"],
                  borderRadius: theme.radii.sm,
                  padding: theme.space.md,
                }}
              >
                <Heading as="h3" variant="h3">
                  {l.name}
                </Heading>
                <Flex
                  direction="column"
                  as="ul"
                  css={{ listStyleType: "none" }}
                >
                  {l.products.map(({ product: p, status }) => {
                    return (
                      <Box key={p.id} as="li">
                        <Text
                          css={{
                            textDecoration:
                              status === "PURCHASED" ? "line-through" : "none",
                          }}
                        >
                          {p.name}
                        </Text>
                      </Box>
                    )
                  })}
                </Flex>
              </Box>
            )
          })}
        </Flex>
      ) : null}
      <Spacer size="xl" />
    </>
  )
}

const MyLists = () => {
  const isRestoring = useIsRestoring()
  const {
    data: lists,
    isLoading,
    isFetching,
    isError,
  } = trpc.list.all.useQuery()

  if (lists?.length)
    return (
      <>
        <PageHeading icon={<ListIcon />} heading="Mes listes" />
        <Spacer />
        <StyledUList>
          {lists?.map(({ id, name, products, description }) => {
            const { length } = products
            return (
              <li key={id}>
                <NextLink href={`/app/list/${id}`} passHref>
                  <Link>
                    <StyledPaper>
                      <StyledQuantityIndication>
                        {length === 0 && "Liste vide"}
                        {length === 1 && "1 produit"}
                        {length > 1 && `${length} produits`}
                      </StyledQuantityIndication>
                      <Spacer />
                      <TextEllipsed as="p" fontSize="lg">
                        {name}
                      </TextEllipsed>
                      <Spacer size="sm" />
                      <StyledDescription
                        desc={description || "Aucune description"}
                      />
                    </StyledPaper>
                  </Link>
                </NextLink>
              </li>
            )
          })}
        </StyledUList>
        <Spacer size="lg" />
        <CreateList title="Créer une nouvelle liste" />
      </>
    )

  if ((isLoading && isFetching) || isRestoring) return <Loading />
  if (isError) return <Failure />
  return <Empty />
}

const MyListsPage: NextPageWithLayout = () => {
  return (
    <>
      <SharedList />
      <MyLists />
    </>
  )
}

const Loading: FC = () => {
  return <Loader />
}

const Failure: FC = () => {
  return (
    <Text role="alert" color="danger-low">
      Oups, tes listes de courses n&apos;ont pas été chargées
    </Text>
  )
}

const Empty: FC = () => {
  return (
    <Box>
      <PageHeading icon={<Share1Icon />} heading="Mes listes" />
      <Text fontSize="md">Commence par créer une liste</Text>
      <Spacer />
      <CreateList title="Créer" />
    </Box>
  )
}

MyListsPage.getLayout = (page) => (
  <>
    <SEO title="Shoplyst | Listes" />
    <PublicLayout>
      <AppShell>{page}</AppShell>
    </PublicLayout>
  </>
)

export default MyListsPage
