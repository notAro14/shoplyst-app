import { createTRPCReact } from "@trpc/react"
import type { AppRouter } from "src/server/routers/_app.router"

export function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""

  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}/api/trpc`

  if (process.env.RAILWAY_STATIC_URL)
    return `https://${process.env.RAILWAY_STATIC_URL}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

//export const trpc = createTRPCNext<AppRouter>({
//  config() {
//    return {
//      links: [
//        httpBatchLink({
//          /**
//           * If you want to use SSR, you need to use the server's full URL
//           * @link https://trpc.io/docs/ssr
//           **/
//          url: `${getBaseUrl()}/api/trpc`,
//        }),
//      ],
//      /**
//       * @link https://react-query-v3.tanstack.com/reference/QueryClient
//       **/
//      queryClientConfig: {
//        defaultOptions: {
//          queries: {
//            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//          },
//        },
//      },
//    }
//  },
//  /**
//   * @link https://trpc.io/docs/ssr
//   **/
//  ssr: true,
//})

export const trpc = createTRPCReact<AppRouter>()
