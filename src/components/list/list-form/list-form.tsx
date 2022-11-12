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
  defaultValues?: {
    name: string
    description: string | null
  }
  mode?: "UPDATE" | "CREATE"
}> = ({ onSubmit, isSubmitting, defaultValues, mode = "CREATE" }) => {
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
    setFocus,
    reset,
  } = useForm<ListFields>({
    mode: "all",
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    },
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
            maxLength: {
              value: 30,
              message: "Ce titre est trop long",
            },
          })}
          placeholder="ex : Aujourd'hui"
          autoComplete="off"
          id={LIST_NAME}
          className={field}
        />
        {errors[LIST_NAME] && (
          <Text role="alert" color="danger-low" fontSize="sm">
            {errors[LIST_NAME].message}
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
          {...register(LIST_DESC, {
            maxLength: {
              value: 30,
              message: "La description est trop longue",
            },
          })}
          placeholder="ex : Les courses hebdomadaires"
          id="list.description"
          className={field}
        />
        {errors[LIST_DESC] && (
          <Text role="alert" color="danger-low" fontSize="sm">
            {errors[LIST_DESC].message}
          </Text>
        )}
      </Flex>
      <Spacer size="xl" />
      <Button
        colorScheme="accent"
        size="small"
        fullWidth
        type="submit"
        disabled={isValid === false || isSubmitting || isDirty === false}
      >
        {mode === "CREATE" && "Créer"}
        {mode === "UPDATE" && "Enregistrer"}
      </Button>
      <Spacer />
      <Button
        colorScheme="danger"
        size="small"
        variant="outlined"
        fullWidth
        type="button"
        disabled={isDirty === false}
        onClick={() => reset()}
      >
        Annuler
      </Button>
    </form>
  )
}

export default ListForm
