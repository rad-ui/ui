import React from 'react'
// @ts-ignore
import { customClassSwitcher } from '~/core'

export type AccordionItemProps = {
  children: React.ReactNode
  customItemClass?: string
  value?: number
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value,
  customItemClass = ''
}) => {
  const rootClass = customClassSwitcher(customItemClass, 'Accordion')
  return <div className={`${rootClass}-item`}>{children}</div>
}

export default AccordionItem
