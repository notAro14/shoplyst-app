import { FC, ReactNode, useState } from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { httpBatchLink } from "@trpc/client"

import { getBaseUrl, trpc } from "src/utils/trpc"
import { THEMES } from "src/styles/theme"

const persister = createSyncStoragePersister({
  storage: typeof window === "undefined" ? undefined : window.localStorage,
})

interface Props {
  children: ReactNode
  session: Session
}
const Providers: FC<Props> = ({ children, session }) => {
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
          // resume mutations after initial restore from localStorage was successful
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries()
          })
        }}
      >
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" value={THEMES}>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </PersistQueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
