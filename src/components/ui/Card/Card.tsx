import React from 'react'

/**
 * Shards
 */
import CardRoot from './shards/CardRoot'

export type CardProps = {
  id?: string
  children: React.ReactNode
  customRootClass?: string
  className?: string
  props?: any
  rootStyles?: any
}

const Card = ({
  id,
  children,
  className = '',
  customRootClass,
  rootStyles,
  ...props
}: CardProps) => {
  return (
    <CardRoot
      className={className}
      customRootClass={customRootClass}
      styles={rootStyles}
      id={id}
      {...props}
    >
      {children}
    </CardRoot>
  )
}

Card.Root = CardRoot
export default Card
