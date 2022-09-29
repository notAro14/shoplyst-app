import { FC, ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

import { THEMES } from "src/styles/theme"

interface Props {
  children: ReactNode
  session: Session
}
const Providers: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" value={THEMES}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
