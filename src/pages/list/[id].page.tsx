import { useRouter } from "next/router"
import NextLink from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import Link from "src/components/common/link"
import Loader from "src/components/common/loader"
import Text from "src/components/common/text"
import { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import List from "./components/list"
import { useIsRestoring } from "@tanstack/react-query"
import SEO from "src/components/common/seo"
import { theme } from "src/styles/theme/stitches.config"

const ListPage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter()
  const listId = query.id as string
  const {
    data: list,
    isLoading,
    isFetching,
    isError,
  } = trpc.list.find.useQuery(listId, { enabled: typeof listId === "string" })
  const isRestoring = useIsRestoring()

  if (list && isReady)
    return (
      <>
        <SEO title={`Shoplyst | ${list.name}`} />
        <List list={list} />
      </>
    )

  if ((isLoading && isFetching) || isReady === false || isRestoring)
    return (
      <>
        <SEO title="Liste | Chargement..." />
        <Loader />
      </>
    )

  if (isError)
    return (
      <>
        <SEO title="Liste | Erreur de chargement" />
        <Text role="alert" color="danger-low">
          Oups ta liste ne s&apos;est pas chargée correctement
        </Text>
      </>
    )

  return (
    <>
      <SEO title="Cette liste n'existe pas" />
      <Text role="alert" color="danger-low">
        Oups cette liste n&apos;existe pas
      </Text>
      <NextLink passHref href="/">
        <Link
          css={{
            display: "flex",
            alignItems: "center",
            gap: theme.space.sm,
          }}
        >
          <ArrowLeftIcon /> Retourner à toutes mes listes
        </Link>
      </NextLink>
    </>
  )
}

export default ListPage
