import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Alerts from '@views/notifications/alerts/Alerts'

const index = () => {
  return <Alerts />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
