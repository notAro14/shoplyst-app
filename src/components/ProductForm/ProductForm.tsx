import { useForm } from "react-hook-form"
import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"
import { FieldContainer, Input, Label } from "src/components/common/FormField"
import Button from "src/components/common/button"
import { Form } from "./ProductForm.css"

const PRODUCT = "product"
const CATEGORY = "category"

const PRODUCT_REGISTER_OPTIONS = [
  PRODUCT,
  {
    required: "Le nom est requis",
    maxLength: {
      value: 30,
      message: "Le nom est trop long",
    },
  },
] as const
const CATEGORY_REGISTER_OPTIONS = [
  CATEGORY,
  { required: "La catégorie est requise" },
] as const

export default function ProductForm() {
  const { data: categories } = trpc.category.all.useQuery()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ category: number; product: string }>({
    defaultValues: {
      [PRODUCT]: "",
      [CATEGORY]: categories ? categories[0].id : 0,
    },
  })
  const { isLoading, mutate: create } = trpc.product.create.useMutation({
    onSuccess() {
      reset()
      toast.success("Article créé")
    },
    onError() {
      toast.error("Le produit n'a pas été ajouté")
    },
  })
  return (
    <Form
      onSubmit={handleSubmit((data) => {
        const { product, category } = data
        create({ categoryId: Number(category), name: product })
      })}
    >
      <FieldContainer error={errors[PRODUCT]?.message}>
        <Label htmlFor={PRODUCT}>Produit</Label>
        <Input id={PRODUCT} {...register(...PRODUCT_REGISTER_OPTIONS)} />
      </FieldContainer>
      <FieldContainer error={errors[CATEGORY]?.message}>
        <Label htmlFor={CATEGORY}>Catégorie</Label>
        <Input
          as="select"
          id={CATEGORY}
          {...register(...CATEGORY_REGISTER_OPTIONS)}
        >
          {categories &&
            categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )
            })}
        </Input>
      </FieldContainer>
      <Button fullWidth disabled={isLoading} type="submit">
        Ajouter un produit
      </Button>
    </Form>
  )
}
