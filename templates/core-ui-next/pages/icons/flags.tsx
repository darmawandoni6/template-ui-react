import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Flags from '@views/icons/flags/Flags'

const index = () => {
  return <Flags />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
