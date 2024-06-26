import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Card'
export type CardRootProps = {
  children: React.ReactNode
  customRootClass?: string
  className?: string
  styles?: any
  props?: any
  id?: string
}

const CardRoot = ({
  children,
  customRootClass,
  className = '',
  id,
  styles,
  ...props
}: CardRootProps) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  return (
    <div
      className={`${rootClass} ${className}`}
      style={styles}
      id={id}
      {...props}
    >
      {children}
    </div>
  )
}

CardRoot.displayName = COMPONENT_NAME

export default CardRoot
