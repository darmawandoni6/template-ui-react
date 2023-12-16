import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import ListGroups from '@views/base/list-groups/ListGroups'

const index = () => {
  return <ListGroups />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
