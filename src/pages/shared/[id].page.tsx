import { Fragment } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useIsRestoring } from "@tanstack/react-query"

import { NextPageWithLayout } from "src/types/next"
import DefaultLayout from "src/layout/default"
import AppShell from "src/components/app-shell"
import { trpc } from "src/utils/trpc"
import SharedList from "src/components/list/SharedList"
import { Anchor, LazyLoader, Text, SEO, Spacer } from "src/components/common"
import { ArrowLeftIcon } from "src/components/common/icons"

const SharedListView = (props: { listId: string }) => {
  const { listId } = props
  const isRestoring = useIsRestoring()
  const { data, error, isLoading, isError, isFetching } =
    trpc.list.findShared.useQuery(listId)

  if (error?.data?.code === "NOT_FOUND")
    return <Text role="alert">Cette liste n&apos;existe pas</Text>
  if (isError) return <Text role="alert">Une erreur s&apos;est produite</Text>
  if ((isLoading && isFetching) || !data || isRestoring) return <LazyLoader />

  const {
    list: { owner, isArchived, name, description, products },
  } = data
  return (
    <Fragment>
      <SEO title={`Shoplyst | ${name} (partagée)`} />
      <Link passHref href="/my-lists" legacyBehavior>
        <Anchor>
          <ArrowLeftIcon /> Toutes mes listes
        </Anchor>
      </Link>
      <Spacer size="lg" />
      <SharedList
        owner={{
          name: owner.name,
          email: owner.email,
        }}
        name={name}
        description={description}
        isArchived={isArchived}
        products={products}
      />
    </Fragment>
  )
}

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter()
  const id = query.id
  if (isReady === false || typeof id !== "string") return null

  return <SharedListView listId={id} />
}

Page.getLayout = (page) => (
  <DefaultLayout>
    <AppShell>{page}</AppShell>
  </DefaultLayout>
)

export default Page
