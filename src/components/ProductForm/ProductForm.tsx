import { useForm } from "react-hook-form"
import { trpc } from "src/utils/trpc"
import { toast } from "src/components/feedback/toast"

const PRODUCT = "product"
const CATEGORY = "category"

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
  const { isLoading, mutate } = trpc.product.create.useMutation({
    onSuccess() {
      reset()
      toast.success("Article créé")
    },
    onError() {
      toast.error("Le produit n'a pas été ajouté")
    },
  })
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const { product, category } = data
        mutate({ categoryId: Number(category), name: product })
      })}
    >
      <label htmlFor={PRODUCT}>Produit</label>
      <input
        id={PRODUCT}
        {...register(PRODUCT, {
          required: "Le nom est requis",
          maxLength: {
            value: 30,
            message: "Le nom est trop long",
          },
        })}
      />
      <br />
      {errors[PRODUCT] && <p>{errors[PRODUCT].message}</p>}
      <br />
      <label htmlFor={CATEGORY}>Catégorie</label>
      <select
        id={CATEGORY}
        {...register(CATEGORY, { required: "La catégorie est requise" })}
      >
        {categories &&
          categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
      </select>
      <br />
      {errors[CATEGORY] && <p>{errors[CATEGORY].message}</p>}
      <br />
      <button disabled={isLoading} type="submit">
        Créer
      </button>
    </form>
  )
}
