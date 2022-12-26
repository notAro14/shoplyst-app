import { Fragment } from "react"
import { useIsRestoring } from "@tanstack/react-query"

import Flex from "src/components/common/flex"
import { InfoCircledIcon, Share1Icon } from "src/components/common/icons"
import PageHeading from "../../components/page-heading"
import { trpc } from "src/utils/trpc"
import Text from "src/components/common/text"
import Spacer from "src/components/common/spacer"
import styles from "./styles"
import { LazyLoader } from "src/components/common/loader"
import ListLinkCard from "src/components/list/ListLinkCard"

const SharedShoppingLists = () => {
  const {
    data: sharedLists,
    isLoading,
    isFetching,
  } = trpc.list.allShared.useQuery()
  const isRestoring = useIsRestoring()
  if (
    (isLoading && isFetching) ||
    typeof sharedLists === "undefined" ||
    isRestoring
  )
    return <LazyLoader />

  const { length } = sharedLists
  return (
    <Fragment>
      <PageHeading icon={<Share1Icon />} heading="Partagées avec moi" />
      {length === 0 && (
        <Text color="functional-low" css={{ userSelect: "none" }}>
          Tu n&apos;as pas encore de listes partagées
        </Text>
      )}
      {length > 0 && (
        <Fragment>
          <Text color="functional-low" className={styles.information}>
            <InfoCircledIcon /> Les listes partagées sont en lecture seule.
          </Text>
          <Spacer />
          <Flex
            as="ul"
            direction="column"
            gap="md"
            className={styles.sharedShoppingListsContainer}
          >
            {sharedLists.map(({ list: l }) => {
              const { id, name, description, owner } = l
              return (
                <li key={id}>
                  <ListLinkCard
                    href={`/shared/${id}`}
                    name={name}
                    description={description}
                    detail={`Par ${owner.name ?? "Utilisateur"}`}
                  />
                </li>
              )
            })}
          </Flex>
        </Fragment>
      )}
    </Fragment>
  )
}

export default SharedShoppingLists
