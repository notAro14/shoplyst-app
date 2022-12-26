import { ArticleStatus, Product } from "@prisma/client"
import { ExclamationTriangleIcon } from "src/components/common/icons"
import {
  Box,
  Checkbox,
  Flex,
  Spacer,
  Text,
  TextEllipsed,
} from "src/components/common"
import styles from "./SharedList.css"

export default function SharedList(props: {
  owner: { name: string | null; email: string | null }
  isArchived: boolean
  name: string
  description: string | null
  products: { product: Product; status: ArticleStatus }[]
}) {
  const { owner, isArchived, name, description, products } = props
  return (
    <Box className={styles.sharedList}>
      <Text fontSize="sm">
        Par{" "}
        <Text as="em" fontSize="sm" color="functional-low">
          {owner.name || owner.email || "Utilisateur inconnu"}
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
      <Flex direction="column" as="ul" className={styles.products} gap="md">
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
}
