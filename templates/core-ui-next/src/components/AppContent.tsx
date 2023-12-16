import { type FunctionComponent, type ReactElement, memo } from 'react'

import { CContainer } from '@coreui/react'

// routes config

type Props = {
  children: ReactElement
}
const AppContent: FunctionComponent<Props> = ({ children }) => {
  return (
    <CContainer className="px-4" lg>
      {children}
    </CContainer>
  )
}

export default memo(AppContent)
