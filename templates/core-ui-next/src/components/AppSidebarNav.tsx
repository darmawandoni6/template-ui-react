import type { ForwardedRef, FunctionComponent, ReactElement } from 'react'
import { Fragment, forwardRef } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { CBadge, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

import navigation from '../_nav'

type PropsBadge = {
  color: string
  text: string
}

type PropsItem = {
  component: typeof CNavGroup | typeof CNavItem | typeof CNavTitle
  name: string
  to: string
  badge?: PropsBadge
}

type CNav = typeof CNavGroup | typeof CNavItem | typeof CNavTitle
type PropsItems = {
  component: CNav
  name: string
  icon?: ReactElement
  to?: string
  items?: PropsItem[]
  badge?: PropsBadge
}

type PropsNavlink = CNav & {
  children: ReactElement
  to: string
  className: string
}

const NavLink = forwardRef<HTMLAnchorElement, PropsNavlink>(
  (props, ref: ForwardedRef<HTMLAnchorElement>) => {
    return <Link {...props} href={props.to} ref={ref} /> // Include 'ref' in the returned Link component
  },
)

type Props = {
  items: typeof navigation
}

export const AppSidebarNav: FunctionComponent<Props> = ({ items }) => {
  const router = useRouter()

  const navLink = (name: string, icon?: ReactElement, badge?: PropsBadge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: PropsItems, index: number, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    const { pathname } = router
    const active = pathname === rest.to
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            active,
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge, indent)}
      </Component>
    )
  }
  const navGroup = (item: PropsItems, index: number) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component
        compact
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={router.pathname.startsWith(to as string)}
        {...rest}
      >
        {item.items?.map((item, index) => navItem(item, index, true))}
      </Component>
    )
  }

  return (
    <Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </Fragment>
  )
}
