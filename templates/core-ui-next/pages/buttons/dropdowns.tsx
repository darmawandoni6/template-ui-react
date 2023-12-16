import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Dropdowns from '@views/buttons/dropdowns/Dropdowns'

const index = () => {
  return <Dropdowns />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
