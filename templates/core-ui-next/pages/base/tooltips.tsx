import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Tooltips from '@views/base/tooltips/Tooltips'

const index = () => {
  return <Tooltips />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
