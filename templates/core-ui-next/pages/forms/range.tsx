import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Range from '@views/forms/range/Range'

const index = () => {
  return <Range />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
