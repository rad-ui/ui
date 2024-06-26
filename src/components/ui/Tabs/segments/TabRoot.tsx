'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'TabRoot'

export type TabRootProps = {
  children: React.ReactNode
  customRootClass?: string
  className?: string
  color?: string
  props?: Record<string, any>[]
}

const TabRoot = ({
  children,
  customRootClass,
  className,
  color,
  ...props
}: TabRootProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  return (
    <div
      className={`${rootClass} ${className}`}
      data-accent-color={color}
      {...props}
    >
      {children}
    </div>
  )
}

TabRoot.displayName = COMPONENT_NAME

export default TabRoot
