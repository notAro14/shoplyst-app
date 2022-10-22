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

const MyListsPage: NextPageWithLayout = () => {
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
        <SEO title="Shoplyst | Mes listes de courses" />
        <PageHeading icon={<ListIcon />} heading="Mes listes de course" />
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

const Loading: FC = () => {
  return (
    <>
      <SEO title="Shoplyst | Chargement..." />
      <Loader />
    </>
  )
}

const Failure: FC = () => {
  return (
    <>
      <SEO title="Shoplyst | Erreur de chargement" />
      <Text color="danger-low">
        Oups, tes listes de courses n&apos;ont pas été chargées
      </Text>
    </>
  )
}

const Empty: FC = () => {
  return (
    <>
      <SEO title="Shoplyst | Mes listes de courses" />
      <Box css={{ margin: "0 auto", width: "fit-content" }}>
        <Text fontSize="md">Commence par créer une liste</Text>
        <Spacer />
        <CreateList title="Créer" />
      </Box>
    </>
  )
}

MyListsPage.getLayout = (page) => (
  <PublicLayout>
    <AppShell>{page}</AppShell>
  </PublicLayout>
)

export default MyListsPage
