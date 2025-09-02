'use client';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

type AccordionContentProps = {
  children: React.ReactNode;
  index: number,
  className? :string
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, index, className = '' }: AccordionContentProps) => {
    const { rootClass } = useContext(AccordionContext);

    return (
        <CollapsiblePrimitive.Content
            asChild
            className={clsx(`${rootClass}-content`, className)}
            id={`content-${index}`}
            role="region"
            aria-labelledby={`section-${index}`}
        >
            {children}
        </CollapsiblePrimitive.Content>
    );
};

export default AccordionContent;
