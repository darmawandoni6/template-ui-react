import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Spinners from '@views/base/spinners/Spinners'

const index = () => {
  return <Spinners />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
