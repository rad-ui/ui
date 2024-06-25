import React from 'react'
import { customClassSwitcher } from '~/core'

type AvatarFallbackProps = {
  fallback?: string
  customRootClass?: string
}

function AvatarFallback({
  fallback,
  customRootClass,
  ...props
}: AvatarFallbackProps) {
  const rootClass = customClassSwitcher(customRootClass, 'Avatar')
  return (
    <span className={`${rootClass}-fallback`} {...props}>
      {fallback}
    </span>
  )
}

export default AvatarFallback
