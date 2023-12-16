import { type ReactElement } from 'react'

import DefaultLayout from '@layout/DefaultLayout'
import ButtonGroups from '@views/buttons/button-groups/ButtonGroups'

const index = () => {
  return <ButtonGroups />
}
index.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default index
