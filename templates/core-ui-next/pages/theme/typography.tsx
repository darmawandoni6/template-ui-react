import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Typography from '@views/theme/typography/Typography'

const index = () => {
  return <Typography />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
