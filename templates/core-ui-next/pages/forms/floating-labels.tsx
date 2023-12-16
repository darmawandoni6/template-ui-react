import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import FloatingLabels from '@views/forms/floating-labels/FloatingLabels'

const index = () => {
  return <FloatingLabels />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
