import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import Flex from "src/components/common/flex"
import Button from "src/components/common/button"
import Spacer from "src/components/common/spacer"
import Text from "src/components/common/text"
import { label, field } from "./styles"

const LIST_NAME = "name"
const LIST_DESC = "description"

export interface ListFields {
  name: string
  description?: string
}
const ListForm: FC<{
  onSubmit(data: ListFields): void
  isSubmitting: boolean
}> = ({ onSubmit, isSubmitting }) => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    setFocus,
  } = useForm<ListFields>({
    mode: "onChange",
  })

  useEffect(() => {
    setFocus(LIST_NAME)
  }, [setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="xxs">
        <label className={label} htmlFor={LIST_NAME}>
          Titre
        </label>
        <input
          {...register(LIST_NAME, {
            required: "Le titre est requis",
            maxLength: 30,
          })}
          placeholder="ex : Aujourd'hui"
          autoComplete="off"
          id={LIST_NAME}
          className={field}
        />
        {errors[LIST_NAME] && errors[LIST_NAME].type === "maxLength" && (
          <Text role="alert" color="danger-low" fontSize="sm">
            Ce titre est trop long
          </Text>
        )}
        {errors[LIST_NAME] && errors[LIST_NAME].type === "required" && (
          <Text role="alert" color="danger-low" fontSize="sm">
            {errors[LIST_NAME]?.message}
          </Text>
        )}
      </Flex>
      <Spacer />
      <Spacer />
      <Flex direction="column" gap="xxs">
        <label className={label} htmlFor="list.description">
          Description (optionnelle)
        </label>
        <input
          {...register(LIST_DESC, { maxLength: 30 })}
          placeholder="ex : Les courses hebdomadaires"
          id="list.description"
          className={field}
        />
        {errors[LIST_DESC] && errors[LIST_DESC].type === "maxLength" && (
          <Text role="alert" color="danger-low" fontSize="sm">
            La description est trop longue
          </Text>
        )}
      </Flex>
      <Spacer size="xl" />
      <Button
        colorScheme="accent"
        size="small"
        fullWidth
        type="submit"
        disabled={isValid === false || isSubmitting}
      >
        Créer
      </Button>
    </form>
  )
}

export default ListForm
