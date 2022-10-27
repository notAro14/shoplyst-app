import { signIn, useSession } from "next-auth/react"
import { FC, Fragment, ReactElement, useEffect } from "react"
import { NextPageWithLayout } from "src/types/next"

import { LazyLoader } from "./common/loader"

interface Props {
  children: ReactElement
}

const AppShell: FC<Props> = ({ children }) => {
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") signIn()
  }, [status])

  switch (status) {
    case "loading":
      return <LazyLoader />
    case "unauthenticated":
      return null
    case "authenticated":
      return <Fragment>{children}</Fragment>
    default:
      throw new Error("Unknown status for useSession")
  }
}

export const withAppShell = (Component: NextPageWithLayout) => {
  const Inner: FC = () => {
    return (
      <AppShell>
        <Component />
      </AppShell>
    )
  }
  Inner.displayName = `${Component.displayName}Outter`
  return Inner
}

export default AppShell
