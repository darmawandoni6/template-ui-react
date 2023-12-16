import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import FormControl from '@views/forms/form-control/FormControl'

const index = () => {
  return <FormControl />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
