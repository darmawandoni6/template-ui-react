import type { ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Widgets from '@views/widgets/Widgets'

const index = () => {
  return <Widgets />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
