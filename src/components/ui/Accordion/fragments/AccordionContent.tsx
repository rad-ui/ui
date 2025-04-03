'use client';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';

type AccordionContentProps = {
  children: React.ReactNode;
  index: number,
  className? :string
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, index, className = '' }: AccordionContentProps) => {
    const { activeItems, rootClass } = useContext(AccordionContext);

    const { itemValue } = useContext(AccordionItemContext);

    const isOpen = activeItems?.includes(index) ?? false;
    console.log(activeItems);
    console.log(itemValue);

    console.log(activeItems?.includes(itemValue));

    return (
        activeItems?.includes(itemValue)
            ? <CollapsiblePrimitive.Content
                asChild
                className={clsx(`${rootClass}-content`, className)}
                id={`content-${index}`}
                role="region"
                aria-labelledby={`section-${index}`}
                aria-hidden={!isOpen}
            >

                {children}

            </CollapsiblePrimitive.Content>
            : ''
    );
};

export default AccordionContent;
