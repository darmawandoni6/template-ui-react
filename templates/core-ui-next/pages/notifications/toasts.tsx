import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Toasts from '@views/notifications/toasts/Toasts'

const index = () => {
  return <Toasts />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
