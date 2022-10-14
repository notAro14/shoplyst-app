import { useIsRestoring } from "@tanstack/react-query"

import Box from "src/components/common/box"
import Heading from "src/components/common/heading"
import Loader from "src/components/common/loader"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import type { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import { ListIcon } from "src/components/common/icons"
import SEO from "src/components/common/seo"

import MyLists from "./components/my-lists"
import { theme } from "src/styles/theme/stitches.config"
import Button from "src/components/common/button"
import PublicLayout from "src/layout/public.layout"
import AppShell from "src/components/app-shell"

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
        <Heading
          as="h1"
          variant="h1"
          css={{ display: "flex", alignItems: "center", gap: theme.space.xs }}
        >
          <Box
            css={{
              // to have pixel perfect alignment with text
              transform: "translateY(-2px)",
            }}
            as="span"
          >
            <ListIcon />
          </Box>
          <span>Mes listes de courses</span>
        </Heading>
        <Spacer />
        <MyLists lists={lists} />
        <Spacer />
        <Button size="small" colorScheme="accent" variant="outlined" fullWidth>
          Ajouter une nouvelle liste
        </Button>
      </>
    )

  if ((isLoading && isFetching) || isRestoring)
    return (
      <>
        <SEO title="Shoplyst | Chargement..." />
        <Loader />
      </>
    )

  if (isError)
    return (
      <>
        <SEO title="Shoplyst | Erreur de chargement" />
        <Text color="danger-low">
          Oups, tes listes de courses n&apos;ont pas été chargées
        </Text>
      </>
    )

  return (
    <>
      <SEO title="Shoplyst | Mes listes de courses" />
      <Box css={{ margin: "0 auto" }}>
        <Text>Commence par ajouter une liste.</Text>
        <Spacer />
        <Button>Ajouter une liste</Button>
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
