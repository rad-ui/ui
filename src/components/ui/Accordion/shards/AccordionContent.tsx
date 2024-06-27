import React from 'react'
// @ts-ignore
import { customClassSwitcher } from '~/core'

type AccordionContentProps = {
  children: React.ReactNode
  index: number
  activeIndex: number
  customRootClass?: string
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  index,
  activeIndex,
  customRootClass
}: AccordionContentProps) => {
  const rootClass = customClassSwitcher(customRootClass, 'Accordion')
  return (
    <span className={`${rootClass}-content`}>
      <div
        id={`content-${index}`}
        role="region"
        aria-labelledby={`section-${index}`}
        hidden={activeIndex !== index}
      >
        {children}
      </div>
    </span>
  )
}

export default AccordionContent
