import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import CoreUIIcons from '@views/icons/coreui-icons/CoreUIIcons'

const index = () => {
  return <CoreUIIcons />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
