import produce from "immer"
import { Fragment } from "react"
import { withAppShell } from "src/components/app-shell"
import { SEO } from "src/components/common"
import { trpc } from "src/utils/trpc"

function Page() {
  const { data } = trpc.product.list.useQuery()
  const utils = trpc.useContext()
  const { mutate } = trpc.product.remove.useMutation({
    async onMutate(deletedId) {
      await utils.product.list.cancel()
      const previous = utils.product.list.getData()
      utils.product.list.setData((p) => {
        return produce(p, (draft) => {
          if (!p || !draft) return
          draft.filter(({ id }) => Number(id) !== Number(deletedId))
        })
      })
      return { previous }
    },
    onError(_error, _variables, context) {
      utils.product.list.setData(context?.previous)
    },
    onSettled() {
      utils.product.list.invalidate()
    },
  })
  const makeOnDeleteProduct = (id: number) => () => mutate(id)
  return (
    <Fragment>
      <SEO title="Shoplyst | Liste des produits" />
      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data
          ? data.map((d) => {
              return (
                <li
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={d.id}
                >
                  <span style={{ display: "flex", gap: "1rem" }}>
                    <span>{d.name}</span>
                    <span>{d.category?.name}</span>
                  </span>
                  <button onClick={makeOnDeleteProduct(d.id)}>Supprimer</button>
                </li>
              )
            })
          : null}
      </ul>
    </Fragment>
  )
}

export default withAppShell(Page)
