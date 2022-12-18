import { useEffect, useState } from "react"
import { trpc } from "src/utils/trpc"
import { Dialog } from "src/components/common/dialog"
import Checkbox from "src/components/common/checkbox"
import Button from "src/components/common/button"
import Spacer from "src/components/common/spacer"
import { Fieldset } from "./ShareDialog.css"
import Text from "src/components/common/text"
import { toast } from "src/components/feedback/toast"

interface Props {
  isOpen: boolean
  onDismiss(): void
  listId: string | undefined | null
}
export default function ShareDialog({ isOpen, onDismiss, listId }: Props) {
  const { prefetch, invalidate } = trpc.useContext().user.getAll
  const { mutate } = trpc.list.share.useMutation({
    onSuccess() {
      toast.success("Partage enregistrée")
      listId && invalidate({ listId })
    },
    onError() {
      toast.error("Une erreur s'est produite")
    },
    onSettled() {
      onDismiss()
    },
  })

  useEffect(() => {
    listId && prefetch({ listId })
  }, [prefetch, listId])

  return (
    <Dialog title="Partager la liste" isOpen={isOpen} onDismiss={onDismiss}>
      {listId && (
        <ShareDialogForm
          onSubmit={async (userIds) => {
            mutate({ listId, userIds })
          }}
          listId={listId}
        />
      )}
    </Dialog>
  )
}

function ShareDialogForm({
  listId,
  onSubmit,
}: {
  listId: string
  onSubmit(userIds: string[]): void
}) {
  const { data } = trpc.user.getAll.useQuery({ listId })
  const [userIds, setUserIds] = useState<string[]>([])

  if (data?.length === 0)
    return (
      <Text color="functional-low" role="alert">
        Aucun utilisateur trouvé
      </Text>
    )

  return data ? (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        onSubmit(userIds)
      }}
    >
      <Fieldset>
        {data.map(function ({ id, name }) {
          if (!name) return null
          return (
            <Checkbox
              key={id}
              label={name}
              name={id}
              id={id}
              onChange={(val) => {
                if (val) setUserIds((ids) => [...ids, id])
                else setUserIds((ids) => ids.filter((i) => i !== id))
              }}
            />
          )
        })}
      </Fieldset>
      <Spacer />
      <Button type="submit" fullWidth>
        Valider
      </Button>
    </form>
  ) : null
}
