import React from 'react'
import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'TextArea'

export type TextAreaProps = {
  children: React.ReactNode
  customRootClass?: string
  className?: string
}

function TextAreaRoot({
  children,
  customRootClass = '',
  className = ''
}: TextAreaProps) {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)
  return <div className={`${rootClass}${className}`}>{children}</div>
}

export default TextAreaRoot
