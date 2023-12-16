import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Select from '@views/forms/select/Select'

const index = () => {
  return <Select />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
