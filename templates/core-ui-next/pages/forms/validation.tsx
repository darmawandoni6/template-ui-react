import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Validation from '@views/forms/validation/Validation'

const index = () => {
  return <Validation />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
