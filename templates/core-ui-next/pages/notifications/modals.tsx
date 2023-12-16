import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Modals from '@views/notifications/modals/Modals'

const index = () => {
  return <Modals />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
