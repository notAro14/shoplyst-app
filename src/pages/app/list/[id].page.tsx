import { Fragment } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { ArrowLeftIcon } from "src/components/common/icons"
import { useIsRestoring } from "@tanstack/react-query"

import Link from "src/components/common/link"
import { LazyLoader } from "src/components/common/loader"
import Text from "src/components/common/text"
import { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import SEO from "src/components/common/seo"
import { theme } from "src/stitches.config"
import Spacer from "src/components/common/spacer"
import DefaultLayout from "src/layout/default"
import AppShell from "src/components/app-shell"

import ViewList from "./components/view-list"

const ListIdPage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter()
  const listId = query.id as string
  const {
    data: list,
    isLoading,
    isFetching,
    isError,
    error,
  } = trpc.list.find.useQuery(listId, { enabled: typeof listId === "string" })
  const isRestoring = useIsRestoring()

  if (list && isReady)
    return (
      <Fragment>
        <SEO title={`Shoplyst | ${list.name}`} />
        <ViewList list={list} />
      </Fragment>
    )

  if ((isLoading && isFetching) || isReady === false || isRestoring)
    return (
      <Fragment>
        <SEO title="Liste | Chargement..." />
        <LazyLoader />
      </Fragment>
    )

  if (isError && error.data?.code === "NOT_FOUND")
    return (
      <Fragment>
        <SEO title="Cette liste n'existe pas" />
        <NextLink passHref href="/app/my-lists">
          <Link
            css={{
              display: "flex",
              alignItems: "center",
              gap: theme.space.sm,
            }}
          >
            <ArrowLeftIcon /> Toutes mes listes
          </Link>
        </NextLink>
        <Spacer />
        <Text role="alert" color="danger-low">
          Oups cette liste n&apos;existe pas
        </Text>
      </Fragment>
    )

  return (
    <Fragment>
      <SEO title="Liste | Erreur de chargement" />
      <Text role="alert" color="danger-low">
        Oups ta liste ne s&apos;est pas chargée correctement
      </Text>
    </Fragment>
  )
}

ListIdPage.getLayout = (page) => (
  <DefaultLayout>
    <AppShell>{page}</AppShell>
  </DefaultLayout>
)

export default ListIdPage
