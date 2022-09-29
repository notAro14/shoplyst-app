import type { ReactNode, ReactElement } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"

//export type NextPageWithLayout<T = Record<string, unknown>> = NextPage<T> & {
//  getLayout?: (page: JSX.Element) => ReactNode
//}
//export type AppPropsWithLayout<T> = AppProps<T> & {
//  Component: NextPageWithLayout
//}

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<TProps> = AppProps<TProps> & {
  Component: NextPageWithLayout
}
