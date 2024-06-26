'use client'

import React from 'react'

import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Strong'

export type StrongProps = {
  children: React.ReactNode
  className?: string
  customRootClass?: string
  props?: any
  id?: string
  styles?: any
}

const Strong = ({
  children,
  className,
  customRootClass,
  id,
  styles,
  ...props
}: StrongProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)
  return (
    <strong
      className={`${rootClass} ${className}`}
      id={id}
      style={styles}
      {...props}
    >
      {children}
    </strong>
  )
}

Strong.displayName = COMPONENT_NAME

export default Strong
