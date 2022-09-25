import { apiSlice } from "src/store/api"
import { fetchArticles } from "src/api/article.api"

export const articleApiSlice = apiSlice.injectEndpoints({
  endpoints(build) {
    return {
      getArticles: build.query<Awaited<ReturnType<typeof fetchArticles>>, void>(
        {
          providesTags: ["Articles"],
          async queryFn() {
            return {
              data: await fetchArticles(),
            }
          },
        }
      ),
    }
  },
})

export const { useGetArticlesQuery } = articleApiSlice
