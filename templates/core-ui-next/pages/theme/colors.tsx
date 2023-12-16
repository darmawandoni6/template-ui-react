import React, { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import Colors from '@views/theme/colors/Colors'

const index = () => {
  return <Colors />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
