import "src/styles/reset.css"
import "src/styles/fonts.css"
import type { AppPropsWithLayout } from "src/types/next"
import DefaultLayout from "src/layout/default"
import Providers from "src/providers"
import { Session } from "next-auth"
import { ToastPortal } from "src/components/feedback/toast"
import { Fragment } from "react"

const getPublicLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
)

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? getPublicLayout
  return (
    <Fragment>
      <Providers session={session}>
        {getLayout(<Component {...pageProps} />)}
      </Providers>
      <ToastPortal />
    </Fragment>
  )
}

export default MyApp
