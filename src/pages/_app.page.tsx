import "src/styles/reset.css"
import "src/styles/fonts.css"

import { Session } from "next-auth"

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
    </Providers>
  )
}

export default MyApp
