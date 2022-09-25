import { FC, ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

import { THEMES } from "src/styles/theme"
import { store } from "src/store"

interface Props {
  children: ReactNode
  session: Session
}
const Providers: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" value={THEMES}>
          {children}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}

export default Providers
