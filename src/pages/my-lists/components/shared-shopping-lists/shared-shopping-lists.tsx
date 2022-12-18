import { Fragment } from "react"
import { useIsRestoring } from "@tanstack/react-query"

import Flex from "src/components/common/flex"
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Share1Icon,
} from "src/components/common/icons"
import Box from "src/components/common/box"
import PageHeading from "../../components/page-heading"
import { trpc } from "src/utils/trpc"
import Text from "src/components/common/text"
import Spacer from "src/components/common/spacer"
import { TextEllipsed } from "src/components/common/ellipsed"
import * as styles from "./styles"
import { LazyLoader } from "src/components/common/loader"
import Checkbox from "src/components/common/checkbox"

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
            direction="column"
            gap="md"
            className={styles.sharedShoppingListsContainer}
          >
            {sharedLists.map(({ list: l }) => {
              const { isArchived, id, owner, name, description, products } = l
              return (
                <Box key={id} className={styles.sharedShoppingListContainer}>
                  <Text fontSize="sm">
                    Par{" "}
                    <Text as="em" fontSize="sm" color="functional-low">
                      {owner.name || owner.email}
                    </Text>
                  </Text>
                  <Spacer size="xxs" />
                  {isArchived && (
                    <Text
                      fontSize="sm"
                      role="alert"
                      color="warning-low"
                      className={styles.isArchivedAlert}
                    >
                      <ExclamationTriangleIcon /> Archivée
                    </Text>
                  )}
                  <Spacer size="xxs" />
                  <TextEllipsed as="p" fontSize="lg">
                    {name}
                  </TextEllipsed>
                  <TextEllipsed
                    className={styles.description}
                    as="em"
                    fontSize="sm"
                    color="functional-low"
                  >
                    {description || "Aucune description"}
                  </TextEllipsed>
                  <Spacer size="xxs" className={styles.spacerLine} />
                  <Spacer />
                  <Flex
                    direction="column"
                    as="ul"
                    className={styles.productsContainer}
                    gap="md"
                  >
                    {products.map(({ product: p, status }) => {
                      const { id: productId, name: productName } = p
                      return (
                        <li key={productId}>
                          <Checkbox
                            name={productName}
                            label={productName}
                            id={String(productId)}
                            checked={status === "PURCHASED"}
                            readOnly
                          />
                        </li>
                      )
                    })}
                  </Flex>
                </Box>
              )
            })}
          </Flex>
        </Fragment>
      )}
    </Fragment>
  )
}

export default SharedShoppingLists
