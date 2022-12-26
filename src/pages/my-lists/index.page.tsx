import { ArchiveIcon, FileTextIcon } from "src/components/common/icons"
import { useIsRestoring } from "@tanstack/react-query"
import { FC, Fragment } from "react"

import Box from "src/components/common/box"
import { LazyLoader } from "src/components/common/loader"
import type { NextPageWithLayout } from "src/types/next"
import SEO from "src/components/common/seo"
import { withAppShell } from "src/components/app-shell"
import CreateList from "./components/create-list/create-list"
import PageHeading from "./components/page-heading"
import Text from "src/components/common/text"
import Spacer from "src/components/common/spacer"
import { StyledUList } from "./styles"
import SharedShoppingLists from "./components/shared-shopping-lists"
import ListLinkCard from "src/components/list/ListLinkCard"
import { useGetAllListsQuery } from "src/services"

const ShoppingLists: FC<{ isArchived?: boolean }> = ({
  isArchived = false,
}) => {
  const isRestoring = useIsRestoring()
  const { data: lists, isLoading, isFetching, isError } = useGetAllListsQuery()

  if (lists?.length)
    return (
      <Fragment>
        <PageHeading
          icon={isArchived ? <ArchiveIcon /> : <FileTextIcon />}
          heading={isArchived ? "Terminées" : "Mes listes de courses"}
        />
        <Spacer />
        <StyledUList>
          {lists?.map(({ id, name, description, detail }) => {
            return (
              <li key={id}>
                <ListLinkCard
                  detail={detail}
                  href={`/my-list/${id}`}
                  name={name}
                  description={description}
                />
              </li>
            )
          })}
        </StyledUList>
        <Spacer size="lg" />
        {isArchived === false && (
          <CreateList title="Créer une nouvelle liste" />
        )}
      </Fragment>
    )

  if ((isLoading && isFetching) || isRestoring) return <LazyLoader />
  if (isError)
    return (
      <Text role="alert" color="danger-low">
        Oups, tes listes de courses n&apos;ont pas été chargées
      </Text>
    )
  // there are no archived lists
  if (isArchived) return null
  return <Empty />
}

const MyListsPage: NextPageWithLayout = () => {
  return (
    <Fragment>
      <SEO title="Shoplyst | Listes" />
      <ShoppingLists />
      <Spacer size="2xl" />
      <SharedShoppingLists />
      <Spacer size="2xl" />
      <ShoppingLists isArchived />
    </Fragment>
  )
}

const Empty: FC = () => {
  return (
    <Box>
      <PageHeading icon={<FileTextIcon />} heading="Listes de courses" />
      <Text fontSize="md">Commence par créer une liste</Text>
      <Spacer />
      <CreateList title="Créer" />
    </Box>
  )
}

export default withAppShell(MyListsPage)
