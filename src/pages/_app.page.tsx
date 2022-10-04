import { Session } from "next-auth"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import "src/styles/reset.css"
import "src/styles/fonts.css"
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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "var(--fonts-sans)",
          },
        }}
      />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </Providers>
  )
}

export default MyApp
