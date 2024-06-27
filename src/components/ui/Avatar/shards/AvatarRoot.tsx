import React from 'react'
import { customClassSwitcher } from '~/core'

type AvatarRootProps = {
  children: React.ReactNode
  customRootClass?: string
}

function Root({ children, customRootClass }: AvatarRootProps) {
  const rootClass = customClassSwitcher(customRootClass, 'Avatar')
  return <span className={`${rootClass}-root`}>{children}</span>
}

export default Root
