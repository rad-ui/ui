'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
};

const AccordionTrigger = React.forwardRef<React.ElementRef<'button'>, AccordionTriggerProps>(
    ({ children, className = '', asChild = false, id, ...props }, ref) => {
        const { rootClass, activeItems, orientation } = useContext(AccordionContext);
        const { itemValue, disabled, headerId } = useContext(AccordionItemContext);

        return (
            <RovingFocusGroup.Item domId={id ?? headerId}>
                <CollapsiblePrimitive.Trigger disabled={disabled} asChild>
                    <ButtonPrimitive
                        className={clsx(rootClass && `${rootClass}-trigger`, className)}
                        ref={ref}
                        aria-disabled={disabled}
                        aria-expanded={activeItems.includes(itemValue)}
                        data-orientation={orientation}
                        asChild={asChild}
                        {...props}
                    >
                        {children}
                    </ButtonPrimitive>
                </CollapsiblePrimitive.Trigger>
            </RovingFocusGroup.Item>
        );
    });

AccordionTrigger.displayName = 'AccordionTrigger';

export default AccordionTrigger;
