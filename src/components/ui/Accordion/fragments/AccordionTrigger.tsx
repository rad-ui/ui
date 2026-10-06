'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
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
        const { rootClass, activeItems, orientation, collapsible } = useContext(AccordionContext);
        const { itemValue, disabled, headerId, setTriggerIdOverride } = useContext(AccordionItemContext);

        // A consumer-supplied id becomes the trigger's DOM id; mirror it so the content's
        // aria-labelledby keeps pointing at the trigger.
        useLayoutEffect(() => {
            setTriggerIdOverride(id);
            return () => setTriggerIdOverride(undefined);
        }, [id, setTriggerIdOverride]);

        const isOpen = activeItems.includes(itemValue);
        // Single, non-collapsible accordion: the open item's trigger cannot close it, so (like
        // Radix) announce it as aria-disabled while keeping it focusable for roving navigation.
        const cannotToggle = isOpen && !collapsible;

        return (
            <RovingFocusGroup.Item domId={id ?? headerId}>
                <CollapsiblePrimitive.Trigger disabled={disabled} asChild>
                    <ButtonPrimitive
                        className={clsx(rootClass && `${rootClass}-trigger`, className)}
                        ref={ref}
                        aria-disabled={Boolean(disabled) || cannotToggle}
                        aria-expanded={isOpen}
                        data-orientation={orientation}
                        data-slot="accordion-trigger"
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
