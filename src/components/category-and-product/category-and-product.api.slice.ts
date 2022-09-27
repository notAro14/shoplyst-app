import { apiSlice } from "src/store/api"
import { fetchCategoriesAndProducts } from "src/components/category-and-product/category-and-product.api"
import { AxiosError } from "axios"

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints(build) {
    return {
      getCategoriesAndProducts: build.query<
        Awaited<ReturnType<typeof fetchCategoriesAndProducts>>,
        void
      >({
        providesTags: ["Products"],
        async queryFn() {
          try {
            const data = await fetchCategoriesAndProducts()
            return {
              data,
            }
          } catch (e) {
            console.error(e)
            return {
              error: e instanceof AxiosError ? e.message : "Unknown error type",
            }
          }
        },
      }),
    }
  },
})

export const { useGetCategoriesAndProductsQuery } = productApiSlice
