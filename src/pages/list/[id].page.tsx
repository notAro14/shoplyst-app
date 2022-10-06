import Head from "next/head"
import { useRouter } from "next/router"
import NextLink from "next/link"

import Link from "src/components/common/link"
import Loader from "src/components/common/loader"
import Text from "src/components/common/text"
import { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import List from "./components/list"

const ListPage: NextPageWithLayout = () => {
  const { query } = useRouter()
  const listId = query.id as string
  const {
    data: list,
    isLoading,
    isFetching,
    isError,
  } = trpc.list.find.useQuery(listId, { enabled: typeof listId === "string" })

  if (list)
    return (
      <>
        <Head>
          <title>{list.name}</title>
        </Head>
        <List list={list} />
      </>
    )

  if (isLoading && isFetching)
    return (
      <>
        <Head>
          <title>Liste | Chargement...</title>
        </Head>
        <Loader />
      </>
    )

  if (isError)
    return (
      <>
        <Head>
          <title>Liste | Erreur de chargement</title>
        </Head>
        <Text role="alert" color="danger-low">
          Oups ta liste ne s&apos;est pas chargée correctement
        </Text>
      </>
    )

  return (
    <>
      <Head>
        <title>Cette liste n&apos;existe pas</title>
      </Head>
      <Text role="alert" color="danger-low">
        Oups cette liste n&apos;existe pas
      </Text>
      <NextLink passHref href="/my-lists">
        <Link>Retourner à toutes mes listes</Link>
      </NextLink>
    </>
  )
}

export default ListPage
