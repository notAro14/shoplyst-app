import { trpc } from "src/utils/trpc"

export const useGetAllListsQuery = (isArchived?: boolean) => {
  return trpc.list.all.useQuery(
    { isArchived: isArchived ?? false },
    {
      select(data) {
        return data.map((list) => {
          const labels: Record<number, string> = {
            0: "Liste vide",
            1: "1 produit",
          }
          const quantity = list.products.length
          return { ...list, detail: labels[quantity] ?? `${quantity} produits` }
        })
      },
    }
  )
}
