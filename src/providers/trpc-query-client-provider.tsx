import { FC, ReactNode, useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { httpBatchLink } from "@trpc/client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { getBaseUrl, trpc } from "src/utils/trpc"

const persister = createSyncStoragePersister({
  storage: typeof window === "undefined" ? undefined : window.sessionStorage,
})

interface Props {
  children: ReactNode
}
const TrpcQueryClientProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
            staleTime: 2000,
            retry: 0,
            networkMode: "offlineFirst",
          },
        },
      })
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() => {
          // resume mutations after initial restore from persister was successful
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries()
          })
        }}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </trpc.Provider>
  )
}

export default TrpcQueryClientProvider
