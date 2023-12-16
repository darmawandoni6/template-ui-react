import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import ChecksRadios from '@views/forms/checks-radios/ChecksRadios'

const index = () => {
  return <ChecksRadios />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
