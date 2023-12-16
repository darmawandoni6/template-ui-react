import { type FunctionComponent, memo } from 'react'

import { CCallout, CLink } from '@coreui/react'

type Props = {
  content: string
  href: string
  name: string
}
const DocsCallout: FunctionComponent<Props> = (props) => {
  const { content, href, name } = props

  const plural = name.slice(-1) === 's' ? true : false

  const _href = `https://coreui.io/react/docs/${href}`

  return (
    <CCallout color="info" className="bg-white">
      {content
        ? content
        : `A React ${name} component ${
            plural ? 'have' : 'has'
          } been created as a native React.js version
      of Bootstrap ${name}. ${name} ${plural ? 'are' : 'is'} delivered with some new features,
      variants, and unique design that matches CoreUI Design System requirements.`}
      <br />
      <br />
      For more information please visit our official{' '}
      <CLink href={_href} target="_blank">
        documentation of CoreUI Components Library for React.js
      </CLink>
      .
    </CCallout>
  )
}

export default memo(DocsCallout)
