import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Placeholders from '@views/base/placeholders/Placeholders'

const index = () => {
  return <Placeholders />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
