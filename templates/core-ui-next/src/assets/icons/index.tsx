import { type ReactNode } from 'react'

import { brandSet, flagSet, freeSet } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol } from '@coreui/react'

type Icons = typeof brandSet | typeof flagSet | typeof freeSet

const toKebabCase = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export const getIconsView = (iconset: Icons, isClient: boolean): ReactNode => {
  if (!isClient) return null
  return Object.entries(iconset).map(([name, value]) => (
    <CCol className="mb-5" xs={6} sm={4} md={3} xl={2} key={name}>
      <CIcon icon={value} size="xxl" />
      <div>{toKebabCase(name)}</div>
    </CCol>
  ))
}
