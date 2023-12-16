import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Buttons from '@views/buttons/buttons/Buttons'

const index = () => {
  return <Buttons />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
