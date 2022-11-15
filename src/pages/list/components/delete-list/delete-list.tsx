import { useRouter } from "next/router"
import { FC, useCallback } from "react"

import { trpc } from "src/utils/trpc"
import { IconButtonV2 } from "src/components/common/icon-button"
import { toast } from "src/components/feedback/toast"
import { TrashIcon } from "src/components/common/icons"

const DeleteList: FC<{ listId: string }> = ({ listId }) => {
  const utils = trpc.useContext()
  const { push } = useRouter()
  const { mutate: deleteList, isLoading } = trpc.list.delete.useMutation({
    async onMutate(updated) {
      await utils.list.all.cancel()
      //await utils.list.allShared.cancel()
      const all = utils.list.all.getData({ isArchived: false })
      const archived = utils.list.all.getData({ isArchived: true })
      const shared = utils.list.allShared.getData()
      utils.list.all.setData((prev) => prev?.filter((l) => l.id !== updated), {
        isArchived: false,
      })
      utils.list.all.setData((prev) => prev?.filter((l) => l.id !== updated), {
        isArchived: true,
      })
      utils.list.allShared.setData((prev) =>
        prev?.filter((l) => l.list.id !== listId)
      )
      toast.success("Liste supprimée")
      push("/my-lists")
      return { all, archived, shared }
    },
    onError(_error, _variables, ctx) {
      utils.list.all.setData(ctx?.all, { isArchived: false })
      utils.list.all.setData(ctx?.archived, { isArchived: true })
      utils.list.allShared.setData(ctx?.shared)
      toast.error("Une erreur s'est produite")
    },
    onSettled() {
      utils.list.all.invalidate({ isArchived: false })
      utils.list.all.invalidate({ isArchived: true })
      utils.list.allShared.invalidate()
    },
  })
  const onClick = useCallback(() => {
    deleteList(listId)
  }, [deleteList, listId])
  return (
    <IconButtonV2
      label="Supprimer la liste"
      variant="ghost"
      colorScheme="danger"
      onClick={() => {
        const yes = confirm("La liste va être supprimée")
        if (yes) onClick()
      }}
      disabled={isLoading}
      icon={<TrashIcon />}
    />
  )
}

export default DeleteList
