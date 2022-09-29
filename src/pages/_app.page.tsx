import { Session } from "next-auth"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "src/styles/reset.css"
import "src/styles/fonts.css"
import { trpc } from "src/utils/trpc"
import type { AppPropsWithLayout } from "src/types/next"
import { PublicLayout } from "src/layout/public.layout"
import Providers from "src/providers"

const getPublicLayout = (page: JSX.Element) => (
  <PublicLayout>{page}</PublicLayout>
)

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? getPublicLayout
  return (
    <Providers session={session}>
      {getLayout(<Component {...pageProps} />)}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </Providers>
  )
}

export default trpc.withTRPC(MyApp)
