import type { FunctionComponent, ReactElement } from 'react'

import Head from 'next/head'

import AppContent from '../components/AppContent'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import AppSidebar from '../components/AppSidebar'

type Props = {
  children: ReactElement
}
const DefaultLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="CoreUI for React - Open Source Bootstrap Admin Template"
        />
        <meta name="author" content="Łukasz Holeczek" />
        <meta
          name="keyword"
          content="Bootstrap,Admin,Template,Open,Source,CSS,SCSS,HTML,RWD,Dashboard,React"
        />
        <title>CoreUI Free React.js Admin Template</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent>{children}</AppContent>
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default DefaultLayout
