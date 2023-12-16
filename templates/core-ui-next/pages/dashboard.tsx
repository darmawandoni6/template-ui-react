import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Dashboard from '@views/dashboard/Dashboard'

const index = () => {
  return <Dashboard />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
