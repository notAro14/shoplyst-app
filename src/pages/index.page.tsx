import { useIsRestoring } from "@tanstack/react-query"
import Head from "next/head"

import Heading from "src/components/common/heading"
import Loader from "src/components/common/loader"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import type { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import { ListIcon } from "src/components/common/icons"

import MyLists from "./components/my-lists"
import { theme } from "src/styles/theme/stitches.config"

const IndexPage: NextPageWithLayout = () => {
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
        <Head>
          <title>Mes listes</title>
        </Head>

        <Heading
          as="h1"
          variant="h1"
          css={{ display: "flex", alignItems: "center", gap: theme.space.xs }}
        >
          <ListIcon />
          <span>Mes listes</span>
        </Heading>
        <Spacer />
        <MyLists lists={lists} />
      </>
    )

  if ((isLoading && isFetching) || isRestoring)
    return (
      <>
        <Head>
          <title>Mes listes | Chargement...</title>
        </Head>
        <Loader />
      </>
    )

  if (isError)
    return (
      <>
        <Head>
          <title>Mes listes | Erreur de chargement</title>
        </Head>
        <Text color="danger-low">
          Oups, tes listes de courses n&apos;ont pas été chargées
        </Text>
      </>
    )

  return (
    <>
      <Head>
        <title>Mes listes</title>
      </Head>
      <Text>Crée ta première liste de courses.</Text>
    </>
  )
}

export default IndexPage
