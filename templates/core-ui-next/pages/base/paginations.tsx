import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Paginations from '@views/base/paginations/Paginations'

const index = () => {
  return <Paginations />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
