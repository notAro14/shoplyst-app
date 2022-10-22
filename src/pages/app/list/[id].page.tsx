import { useRouter } from "next/router"
import NextLink from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useIsRestoring } from "@tanstack/react-query"

import Link from "src/components/common/link"
import Loader from "src/components/common/loader"
import Text from "src/components/common/text"
import { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import SEO from "src/components/common/seo"
import { theme } from "src/styles/theme/stitches.config"
import Spacer from "src/components/common/spacer"
import PublicLayout from "src/layout/public.layout"
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
      <>
        <SEO title={`Shoplyst | ${list.name}`} />
        <ViewList list={list} />
      </>
    )

  if ((isLoading && isFetching) || isReady === false || isRestoring)
    return (
      <>
        <SEO title="Liste | Chargement..." />
        <Loader />
      </>
    )

  if (isError && error.data?.code === "NOT_FOUND")
    return (
      <>
        <SEO title="Cette liste n'existe pas" />
        <NextLink passHref href="/app/my-lists">
          <Link
            css={{
              display: "flex",
              alignItems: "center",
              gap: theme.space.sm,
            }}
          >
            <ArrowLeftIcon /> Mes listes de courses
          </Link>
        </NextLink>
        <Spacer />
        <Text role="alert" color="danger-low">
          Oups cette liste n&apos;existe pas
        </Text>
      </>
    )

  return (
    <>
      <SEO title="Liste | Erreur de chargement" />
      <Text role="alert" color="danger-low">
        Oups ta liste ne s&apos;est pas chargée correctement
      </Text>
    </>
  )
}

ListIdPage.getLayout = (page) => (
  <PublicLayout>
    <AppShell>{page}</AppShell>
  </PublicLayout>
)

export default ListIdPage
