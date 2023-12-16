import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Tables from '@views/base/tables/Tables'

const index = () => {
  return <Tables />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
