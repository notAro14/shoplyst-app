import { signIn, useSession } from "next-auth/react"
import { FC, ReactNode, useEffect } from "react"
import Box from "./common/box"

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
      return (
        <Box
          css={{
            width: "100%",
            height: 300,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Loader />
        </Box>
      )
  }
}

export default AppShell
