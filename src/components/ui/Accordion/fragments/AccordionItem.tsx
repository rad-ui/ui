'use client';
import React, { useContext, useId, useCallback } from 'react';
import clsx from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import Primitive from '~/core/primitives/Primitive';
import { mergeRefs } from '~/core/utils/mergeRefs';

export type AccordionItemProps = React.ComponentPropsWithoutRef<'div'> & {
    value?: number | string;
    disabled?: boolean;
    asChild?: boolean;
};

const AccordionItem = React.forwardRef<React.ElementRef<'div'>, AccordionItemProps>(({ children, value, className = '', disabled = false, asChild = false, ...props }, forwardedRef) => {
    const accordionItemRef = React.useRef<HTMLDivElement | null>(null);
    const autoValue = useId();
    const itemValue = value ?? autoValue;
    const headerId = useId();
    const {
        rootClass,
        activeItems,
        setActiveItems,
        transitionDuration,
        transitionTimingFunction,
        openMultiple: isMultiple,
        collapsible,
        disabled: rootDisabled,
        orientation
    } = useContext(AccordionContext);

    const effectiveDisabled = disabled || rootDisabled;

    const isOpen = activeItems.includes(itemValue);

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (effectiveDisabled) {
                return;
            }
            if (isMultiple) {
                setActiveItems((prev) => {
                    if (nextOpen) {
                        return prev.includes(itemValue) ? prev : [...prev, itemValue];
                    }
                    return prev.filter((item) => item !== itemValue);
                });
                return;
            }

            if (nextOpen) {
                setActiveItems([itemValue]);
                return;
            }

            setActiveItems((prev) => {
                if (!collapsible && prev.includes(itemValue) && prev.length === 1) {
                    return prev;
                }
                return [];
            });
        },
        [effectiveDisabled, isMultiple, itemValue, setActiveItems, collapsible]
    );

    return (
        <AccordionItemContext.Provider value={{ itemValue, disabled: effectiveDisabled, headerId }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={handleOpenChange}
                disabled={effectiveDisabled}
                transitionDuration={transitionDuration}
                transitionTimingFunction={transitionTimingFunction}
                asChild
            >
                <Primitive.div
                    ref={mergeRefs(accordionItemRef, forwardedRef)}
                    className={clsx(`${rootClass}-item`, className)}
                    data-state={isOpen ? 'open' : 'closed'}
                    data-disabled={effectiveDisabled ? '' : undefined}
                    data-orientation={orientation}
                    asChild={asChild}
                    {...props}
                >
                    {children}
                </Primitive.div>
            </CollapsiblePrimitive.Root>
        </AccordionItemContext.Provider>
    );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
