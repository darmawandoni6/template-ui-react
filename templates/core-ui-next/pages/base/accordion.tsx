import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Accordion from '@views/base/accordion/Accordion'

const index = () => {
  return <Accordion />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
