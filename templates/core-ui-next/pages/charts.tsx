import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Charts from '@views/charts/Charts'

const index = () => {
  return <Charts />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
