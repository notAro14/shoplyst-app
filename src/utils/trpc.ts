import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "src/server/routers/_app.router"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""

  if (process.env.RAILWAY_STATIC_URL)
    return `https://${process.env.RAILWAY_STATIC_URL}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
})
// => { useQuery: ..., useMutation: ...}
