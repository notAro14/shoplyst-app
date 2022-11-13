import { FC } from "react"
import produce from "immer"
import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"
import { Dialog } from "src/components/common/dialog"
import ListForm from "src/components/list/list-form"

const EditListDialog: FC<{
  isOpen: boolean
  onDismiss(): void
  listName: string
  listDescription: string | null
  listId: string
}> = ({
  isOpen,
  onDismiss,
  listDescription: description,
  listName: name,
  listId,
}) => {
  const utils = trpc.useContext()
  const { mutate } = trpc.list.update.useMutation({
    async onSuccess() {
      await utils.list.find.invalidate(listId)
    },
    async onMutate(variables) {
      await utils.list.find.cancel(variables.id)
      const previous = utils.list.find.getData(variables.id)
      utils.list.find.setData((prev) => {
        return produce(prev, (draft) => {
          if (!draft) return
          draft.name = variables.name
          draft.description = variables.description ?? draft.description
        })
      }, variables.id)
      onDismiss()
      toast.success("Liste mise à jour")
      return { previous }
    },
    onError(_error, variables, context) {
      utils.list.find.setData(context?.previous, variables.id)
    },
    onSettled(_data, _error, variables) {
      utils.list.find.invalidate(variables.id)
    },
  })
  return (
    <Dialog title="Modifier la liste" isOpen={isOpen} onDismiss={onDismiss}>
      <ListForm
        defaultValues={{ name, description }}
        isSubmitting={false}
        onSubmit={(data) => {
          mutate({ id: listId, name: data.name, description: data.description })
        }}
        mode="UPDATE"
      />
    </Dialog>
  )
}

export default EditListDialog
