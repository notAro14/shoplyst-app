import "src/styles/reset.css"
import "src/styles/fonts.css"
import type { AppPropsWithLayout } from "src/types/next"
import { PublicLayout } from "src/layout/public.layout"
import Providers from "src/providers"
import { Session } from "next-auth"
import { ToastPortal } from "src/components/feedback/toast"

const getPublicLayout = (page: JSX.Element) => (
  <PublicLayout>{page}</PublicLayout>
)

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? getPublicLayout
  return (
    <>
      <Providers session={session}>
        {getLayout(<Component {...pageProps} />)}
      </Providers>
      <ToastPortal />
    </>
  )
}

export default MyApp
