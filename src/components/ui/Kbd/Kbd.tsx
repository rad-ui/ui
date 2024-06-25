'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Kbd'

export type KbdProps = {
  children: React.ReactNode
  customRootClass?: string
  className?: string
  props: Record<string, any>[]
}

function Kbd({ children, customRootClass, className, ...props }: KbdProps) {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)
  return (
    <kbd className={`${rootClass} ${className}`} {...props}>
      {children}
    </kbd>
  )
}

export default Kbd
