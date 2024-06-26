import React from 'react'
import { customClassSwitcher } from '~/core'

export type AccordionItemProps = {
  children: React.ReactNode
  customItemClass?: string
  value?: number
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  customItemClass = ''
}) => {
  const rootClass = customClassSwitcher(customItemClass, 'Accordion')
  return <div className={`${rootClass}-item`}>{children}</div>
}

export default AccordionItem
