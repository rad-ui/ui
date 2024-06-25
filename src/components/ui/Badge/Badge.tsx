'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Badge'

export type BadgeProps = {
  children?: React.ReactNode
  customRootClass?: string
  className?: string
  color?: string
  props?: Record<string, any>[]
}

function Badge({
  children,
  customRootClass,
  className,
  color,
  ...props
}: BadgeProps) {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  return (
    <span
      className={`${rootClass} ${className}`}
      data-accent-color={color ?? undefined}
      {...props}
    >
      {children}
    </span>
  )
}

Badge.displayName = COMPONENT_NAME

export default Badge
