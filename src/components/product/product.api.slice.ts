import { apiSlice } from "src/store/api"
import { fetchProducts } from "src/components/product/product.api"

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints(build) {
    return {
      getProducts: build.query<Awaited<ReturnType<typeof fetchProducts>>, void>(
        {
          providesTags: ["Products"],
          async queryFn() {
            return {
              data: await fetchProducts(),
            }
          },
        }
      ),
    }
  },
})

export const { useGetProductsQuery } = productApiSlice
