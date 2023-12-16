import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Badges from '@views/notifications/badges/Badges'

const index = () => {
  return <Badges />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
