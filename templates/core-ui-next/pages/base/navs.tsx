import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Navs from '@views/base/navs/Navs'

const index = () => {
  return <Navs />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
