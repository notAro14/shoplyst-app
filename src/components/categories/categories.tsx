import type { FC } from "react"

import Paper from "../common/paper"
import Text from "../common/text"
import { theme } from "src/styles/theme/stitches.config"
import Loader from "src/components/common/loader"
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "src/components/common/accordion"
import Flex from "src/components/common/flex"
import Button from "src/components/common/button"
import { trpc } from "src/utils/trpc"

const Categories: FC = () => {
  const {
    data: categories,
    isError,
    isLoading,
    refetch,
  } = trpc.category.all.useQuery()

  if (isError) return <Failure onRetry={refetch} />
  if (typeof categories === "undefined" || isLoading) return <Loader />
  if (categories.length === 0) return <Empty />
  return (
    <Accordion collapsible type="single">
      {categories?.map(({ id, name, products }) => (
        <AccordionItem key={id} value={name}>
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>
            <Flex
              wrap
              gap="sm"
              css={{
                paddingTop: theme.space.md,
                paddingBottom: theme.space.md,
              }}
            >
              {products.map((p) => (
                <Paper
                  key={p.id}
                  borderRadius="sm"
                  css={{
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: theme.colors.ui,
                    transition: "all 200ms ease-in-out",
                    padding: `${theme.space.sm} ${theme.space.md}`,
                    userSelect: "none",
                    "&:hover": {
                      boxShadow: theme.shadows.medium,
                      backgroundColor: theme.colors["ui-hovered"],
                    },
                  }}
                >
                  <Text fontSize="sm">{p.name}</Text>
                </Paper>
              ))}
            </Flex>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const Failure: FC<{ onRetry(): void }> = ({ onRetry }) => {
  return (
    <Paper
      borderRadius="sm"
      css={{
        backgroundColor: theme.colors["ui-danger"],
        padding: theme.space.md,
        display: "flex",
        flexDirection: "column",
        gap: theme.space.sm,
      }}
    >
      <Text color="danger-low" role="alert">
        Une erreur s&apos;est produite
      </Text>
      <Button
        variant="outlined"
        size="small"
        colorScheme="accent"
        onClick={onRetry}
      >
        Réessayer
      </Button>
    </Paper>
  )
}

const Empty = () => {
  return <Text>Il n&apos;y a pas de produits.</Text>
}

export default Categories
