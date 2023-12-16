import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Cards from '@views/base/cards/Cards'

const index = () => {
  return <Cards />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
