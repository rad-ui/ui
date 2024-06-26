'use client'

import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Separator'

export type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  customRootClass?: string
  props?: any
  styles?: any
  id?: string
}

const Separator = ({
  orientation = 'horizontal',
  className,
  customRootClass,
  styles,
  id,
  ...props
}: SeparatorProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)
  const orientationClass =
    orientation === 'vertical'
      ? `${rootClass}-vertical`
      : `${rootClass}-horizontal`

  return (
    <div
      className={`${rootClass} ${orientationClass} ${className}`}
      id={id}
      style={styles}
      {...props}
    />
  )
}

Separator.displayName = COMPONENT_NAME

export default Separator
