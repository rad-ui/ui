'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type AccordionContentProps = React.ComponentPropsWithoutRef<'div'> & {
  index: number,
};

const AccordionContent = React.forwardRef<React.ElementRef<'div'>, AccordionContentProps>(({ children, index, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AccordionContext);

    return (
        <CollapsiblePrimitive.Content
            ref={ref}
            asChild
            className={clsx(`${rootClass}-content`, className)}
            id={`content-${index}`}
            role="region"
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Content>
    );
});

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
