import { FC, Fragment, useCallback } from "react"

import { trpc } from "src/utils/trpc"
import useDisclosure from "src/hooks/use-disclosure"
import Button from "src/components/common/button"
import ListForm from "src/components/list/list-form"
import ListDialog from "src/components/list/list-dialog"
import type { ListFields } from "src/components/list/list-form"

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
      <ListDialog isOpen={isOpen} onClose={onClose}>
        <ListForm isSubmitting={isLoading} onSubmit={onSubmit} />
      </ListDialog>
      <Button onClick={onOpen} size="small" colorScheme="accent" fullWidth>
        {title}
      </Button>
    </Fragment>
  )
}

export default CreateList
