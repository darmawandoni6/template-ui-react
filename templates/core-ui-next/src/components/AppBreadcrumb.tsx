import { memo } from 'react'

import { useRouter } from 'next/router'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

type PropsBreadcrumbs = {
  pathname: string
  name: string
  active: boolean
}
const AppBreadcrumb = () => {
  const router = useRouter()

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: PropsBreadcrumbs[] = []

    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = curr

      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(router.pathname)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default memo(AppBreadcrumb)
