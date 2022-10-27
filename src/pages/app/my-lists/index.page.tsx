import { ArchiveIcon, FileTextIcon } from "@radix-ui/react-icons"
import { useIsRestoring } from "@tanstack/react-query"
import { FC, Fragment } from "react"
import NextLink from "next/link"

import Box from "src/components/common/box"
import { LazyLoader } from "src/components/common/loader"
import type { NextPageWithLayout } from "src/types/next"
import { trpc } from "src/utils/trpc"
import SEO from "src/components/common/seo"
import { withAppShell } from "src/components/app-shell"
import CreateList from "./components/create-list/create-list"
import PageHeading from "./components/page-heading"
import { TextEllipsed } from "src/components/common/ellipsed"
import Text from "src/components/common/text"
import Link from "src/components/common/link"
import Spacer from "src/components/common/spacer"
import {
  StyledDescription,
  StyledPaper,
  StyledQuantityIndication,
  StyledUList,
} from "./styles"
import SharedShoppingLists from "./components/shared-shopping-lists"

const ShoppingLists: FC<{ isArchived?: boolean }> = ({
  isArchived = false,
}) => {
  const isRestoring = useIsRestoring()
  const {
    data: lists,
    isLoading,
    isFetching,
    isError,
  } = trpc.list.all.useQuery({ isArchived })

  if (lists?.length)
    return (
      <Fragment>
        <PageHeading
          icon={isArchived ? <ArchiveIcon /> : <FileTextIcon />}
          heading={isArchived ? "Archivées" : "Mes listes"}
        />
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
      <PageHeading icon={<FileTextIcon />} heading="Mes listes" />
      <Text fontSize="md">Commence par créer une liste</Text>
      <Spacer />
      <CreateList title="Créer" />
    </Box>
  )
}

export default withAppShell(MyListsPage)
