import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Layout from '@views/forms/layout/Layout'

const index = () => {
  return <Layout />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
