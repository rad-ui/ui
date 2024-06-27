import React from 'react'
// @ts-ignore
import { customClassSwitcher } from '~/core'

export type AccordionRootProps = {
  children: React.ReactNode
  customRootClass?: string
}

function AccordionRoot({ children, customRootClass }: AccordionRootProps) {
  const rootClass = customClassSwitcher(customRootClass, 'Accordion')
  return <span className={`${rootClass}-root`}>{children}</span>
}

export default AccordionRoot
