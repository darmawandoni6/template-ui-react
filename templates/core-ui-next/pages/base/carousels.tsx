import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Carousels from '@views/base/carousels/Carousels'

const index = () => {
  return <Carousels />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
