import { signIn, useSession } from "next-auth/react"
import { FC, ReactNode, useEffect } from "react"

import Loader from "./common/loader"

interface Props {
  children: ReactNode
}

const AppShell: FC<Props> = ({ children }) => {
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") signIn()
  }, [status])

  switch (status) {
    case "authenticated":
      return <>{children}</>
    default:
      return <Loader type="ping" />
  }
}

export default AppShell
