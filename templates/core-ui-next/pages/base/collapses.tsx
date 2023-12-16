import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Collapses from '@views/base/collapses/Collapses'

const index = () => {
  return <Collapses />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
