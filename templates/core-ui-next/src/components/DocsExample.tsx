import { type FunctionComponent, type ReactElement, ReactNode, memo } from 'react'

import { cilCode, cilMediaPlay } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

type Props = {
  children: ReactNode
  href: string
  tabContentClassName?: string
}
const DocsExample: FunctionComponent<Props> = (props) => {
  const { children, href, tabContentClassName } = props

  const _href = `https://coreui.io/react/docs/${href}`

  return (
    <div className="example">
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink href="#" active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Preview
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={_href} target="_blank">
            <CIcon icon={cilCode} className="me-2" />
            Code
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className={`rounded-bottom ${tabContentClassName ? tabContentClassName : ''}`}>
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default memo(DocsExample)
