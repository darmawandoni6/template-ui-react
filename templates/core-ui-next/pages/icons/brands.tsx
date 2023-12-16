import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Brands from '@views/icons/brands/Brands'

const index = () => {
  return <Brands />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
