import { FC, ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

import { THEMES } from "src/styles/theme"
import TrpcQueryClientProvider from "./trpc-query-client-provider"

interface Props {
  children: ReactNode
  session: Session
}
const Providers: FC<Props> = ({ children, session }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" value={THEMES}>
      <SessionProvider session={session}>
        <TrpcQueryClientProvider>{children}</TrpcQueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
