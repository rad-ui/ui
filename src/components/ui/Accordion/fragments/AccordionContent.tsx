'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type AccordionContentProps = React.ComponentPropsWithoutRef<'div'> & {
    /** @deprecated Index is no longer required; ids come from collapsible context. */
    index?: number;
    forceMount?: boolean;
    asChild?: boolean;
};

const AccordionContent = React.forwardRef<React.ElementRef<'div'>, AccordionContentProps>(
    ({ children, index: _index, className = '', forceMount, asChild = false, ...props }, ref) => {
        const { rootClass, orientation } = useContext(AccordionContext);
        const { headerId } = useContext(AccordionItemContext);

        return (
            <CollapsiblePrimitive.Content
                ref={ref}
                asChild={asChild}
                forceMount={forceMount}
                className={clsx(`${rootClass}-content`, className)}
                role="region"
                aria-labelledby={headerId}
                data-orientation={orientation}
                {...props}
            >
                {asChild ? (
                    children
                ) : (
                    <div className={`${rootClass}-content-inner`}>
                        {children}
                    </div>
                )}
            </CollapsiblePrimitive.Content>
        );
    });

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
