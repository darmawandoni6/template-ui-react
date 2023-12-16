import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Popovers from '@views/base/popovers/Popovers'

const index = () => {
  return <Popovers />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
