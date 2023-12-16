import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import InputGroup from '@views/forms/input-group/InputGroup'

const index = () => {
  return <InputGroup />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
