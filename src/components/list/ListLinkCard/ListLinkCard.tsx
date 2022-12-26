import Link from "next/link"
import {
  Anchor,
  Paper,
  Spacer,
  Text,
  TextEllipsed,
} from "src/components/common"
import styles from "./ListLinkCard.css"

export default function ListLinkCard(props: {
  description: string | null
  name: string | null
  detail: string | null
  href: string
}) {
  const { name, description, detail, href } = props
  return (
    <Link href={href} passHref legacyBehavior>
      <Anchor>
        <Paper
          as="span"
          bordered
          borderRadius="sm"
          elevation="low"
          className={styles.paper}
        >
          <Text as="small" variant="text" fontSize="xs" color="functional-low">
            {detail}
          </Text>
          <Spacer />
          <TextEllipsed css={{ lineHeight: "1.1" }} as="p" fontSize="lg">
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
        </Paper>
      </Anchor>
    </Link>
  )
}
