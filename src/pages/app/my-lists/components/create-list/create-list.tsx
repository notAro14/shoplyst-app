import { FC, Fragment, useCallback } from "react"

import { trpc } from "src/utils/trpc"
import useDisclosure from "src/hooks/use-disclosure"
import Button from "src/components/common/button"
import ListForm from "src/components/list/list-form"
import type { ListFields } from "src/components/list/list-form"
import { Dialog } from "src/components/common/dialog"
import { css } from "src/stitches.config"

const dialog = css({ height: "fit-content" })()

const CreateList: FC<{ title: string }> = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const utils = trpc.useContext()
  const { mutate: createList, isLoading } = trpc.list.create.useMutation({
    async onSuccess() {
      await utils.list.all.invalidate()
      onClose()
    },
  })
  const onSubmit = useCallback(
    (data: ListFields) => {
      createList({
        name: data.name,
        description: data.description || "",
        products: [],
      })
    },
    [createList]
  )
  return (
    <Fragment>
      <Dialog
        isOpen={isOpen}
        onDismiss={onClose}
        title="Nouvelle liste"
        className={dialog}
      >
        <ListForm isSubmitting={isLoading} onSubmit={onSubmit} />
      </Dialog>
      <Button onClick={onOpen} size="small" fullWidth>
        {title}
      </Button>
    </Fragment>
  )
}

export default CreateList
