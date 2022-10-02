import { FC, Fragment } from "react"
import { Pencil1Icon, CheckIcon } from "@radix-ui/react-icons"

import type { ProductsOnLists, Product } from "@prisma/client"
import SEO from "src/components/common/seo"
import Heading from "src/components/common/heading"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import { trpc } from "src/utils/trpc"
import Flex from "src/components/common/flex"
import { theme } from "src/styles/theme/stitches.config"
import IconButton from "src/components/common/icon-button"
import Paper from "src/components/common/paper"

const IndexPage: FC = () => {
  const { data: lists } = trpc.list.all.useQuery()

  return (
    <>
      <SEO title="Shoplyst | Fais tes courses avec style" />
      {lists?.map((l) => {
        return (
          <Fragment key={l.id}>
            <Flex gap="md" align="center">
              <Heading as="h2" variant="h2">
                {l.name}
              </Heading>
              <IconButton
                rounded
                aria-label="Modifier la liste"
                variant="ghost"
              >
                <Pencil1Icon />
              </IconButton>
            </Flex>
            <Spacer />
            <Flex as="ul" gap="md" direction="column">
              {l.products?.map(({ product: p, status }) => {
                return (
                  <ProductInsideList
                    p={p}
                    status={status}
                    key={p.id}
                    listId={l.id}
                  />
                )
              })}
            </Flex>
            <Spacer />
          </Fragment>
        )
      })}
    </>
  )
}

export default IndexPage

const ProductInsideList: FC<{
  p: Product
  status: ProductsOnLists["status"]
  listId: string
}> = ({ p, status, listId }) => {
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.list.updateProductStatus.useMutation({
    onSuccess() {
      utils.list.all.invalidate()
    },
  })
  return (
    <button
      style={{
        all: "unset",
        cursor: isLoading ? "not-allowed" : undefined,
      }}
      onClick={() => {
        mutate({
          listId: listId,
          productId: p.id,
          status: status === "PURCHASED" ? "READY" : "PURCHASED",
        })
      }}
      disabled={isLoading}
    >
      <Paper
        borderRadius="sm"
        css={{
          padding: theme.space.md,
          backgroundColor: theme.colors.ui,
          display: "flex",
          alignItems: "center",
          border: "none",
          gap: theme.space.sm,
          ...(status === "PURCHASED"
            ? {
                boxShadow: "unset",
                backgroundColor: theme.colors["bg-alt"],
                color: theme.colors["text-functional-low"],
                fontSize: theme.fontSizes.sm,
              }
            : undefined),
        }}
      >
        {status === "PURCHASED" && <CheckIcon />}
        <Text
          noLineHeight
          color="functional"
          fontSize="lg"
          css={{ color: "inherit", fontSize: "inherit" }}
        >
          {p.name}
        </Text>
      </Paper>
    </button>
  )
}
