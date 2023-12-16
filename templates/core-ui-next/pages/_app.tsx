import type { ReactElement } from 'react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import 'core-js'
import { Provider } from 'react-redux'

import '@scss/style.scss'

import store from '../src/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}
