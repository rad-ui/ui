import React from 'react'
import { customClassSwitcher } from '~/core'

export type AccordionRootProps = {
  children: React.ReactNode
  customRootClass?: string
}

const AccordionRoot = ({ children, customRootClass }: AccordionRootProps) => {
  const rootClass = customClassSwitcher(customRootClass, 'Accordion')
  return <span className={`${rootClass}-root`}>{children}</span>
}

export default AccordionRoot
