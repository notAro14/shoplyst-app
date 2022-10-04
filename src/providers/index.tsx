import { FC, ReactNode, useState } from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc, getBaseUrl } from "src/utils/trpc"
import { THEMES } from "src/styles/theme"

interface Props {
  children: ReactNode
  session: Session
}
const Providers: FC<Props> = ({ children, session }) => {
  const [queryClient] = useState(() => new QueryClient())
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
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" value={THEMES}>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
