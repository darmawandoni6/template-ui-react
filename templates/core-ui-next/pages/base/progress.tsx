import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Progress from '@views/base/progress/Progress'

const index = () => {
  return <Progress />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
