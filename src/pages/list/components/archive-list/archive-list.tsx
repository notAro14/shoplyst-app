import { FC, useCallback } from "react"
import produce from "immer"

import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"
import Button from "src/components/common/button"

const ArchiveList: FC<{ listId: string; disabled: boolean }> = ({
  listId,
  disabled,
}) => {
  const utils = trpc.useContext()
  const { mutate: archiveList, isLoading } = trpc.list.archive.useMutation({
    async onMutate() {
      await utils.list.find.cancel(listId)
      const previous = utils.list.find.getData(listId)
      utils.list.find.setData((prev) => {
        return produce(prev, (draft) => {
          if (!draft || !prev) return
          prev.isArchived = true
        })
      })
      return { previous }
    },
    onError(_error, _updated, ctx) {
      utils.list.find.setData(ctx?.previous, listId)
      toast.error("Une erreur s'est produite")
    },
    onSettled() {
      utils.list.find.invalidate(listId)
      toast.success("Course terminée")
    },
  })
  const onClick = useCallback(() => {
    archiveList(listId)
  }, [listId, archiveList])

  return (
    <Button
      fullWidth
      onClick={onClick}
      variant="filled"
      disabled={isLoading || disabled}
      type="submit"
    >
      Terminer la course
    </Button>
  )
}

export default ArchiveList
