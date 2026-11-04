'use client';
import React, { useContext, useId, useCallback, useState } from 'react';
import clsx from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import Primitive from '~/core/primitives/Primitive';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { usePrefersReducedMotion } from '~/core/hooks/usePrefersReducedMotion';
import { stateData } from '~/core/utils/stateAttributes';

export type AccordionItemProps = React.ComponentPropsWithoutRef<'div'> & {
    value: string;
    disabled?: boolean;
    asChild?: boolean;
    /** Called when this item opens or closes, including when opening another item closes it. */
    onOpenChange?: (open: boolean) => void;
};

const AccordionItem = React.forwardRef<React.ElementRef<'div'>, AccordionItemProps>(({ children, value, className = '', disabled = false, asChild = false, onOpenChange, ...props }, forwardedRef) => {
    const accordionItemRef = React.useRef<HTMLDivElement | null>(null);
    const autoValue = useId();
    const itemValue = value ?? autoValue;
    const generatedHeaderId = useId();
    const [triggerIdOverride, setTriggerIdOverride] = useState<string | undefined>(undefined);
    const headerId = triggerIdOverride ?? generatedHeaderId;
    const {
        rootClass,
        activeItems,
        setActiveItems,
        multiple: isMultiple,
        collapsible,
        disabled: rootDisabled,
        orientation
    } = useContext(AccordionContext);

    const effectiveDisabled = disabled || rootDisabled;
    const prefersReducedMotion = usePrefersReducedMotion();

    const isOpen = activeItems.includes(itemValue);

    // Report real changes only (not the first render), whatever caused them.
    const onOpenChangeRef = React.useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;
    const wasOpenRef = React.useRef(isOpen);
    React.useEffect(() => {
        if (wasOpenRef.current === isOpen) return;
        wasOpenRef.current = isOpen;
        onOpenChangeRef.current?.(isOpen);
    }, [isOpen]);

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
        <AccordionItemContext.Provider value={{ itemValue, disabled: effectiveDisabled, headerId, setTriggerIdOverride }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={handleOpenChange}
                disabled={effectiveDisabled}
                transitionDuration={prefersReducedMotion ? 0 : 200}
                transitionTimingFunction="ease"
                asChild
            >
                <Primitive.div
                    ref={mergeRefs(accordionItemRef, forwardedRef)}
                    className={clsx(rootClass && `${rootClass}-item`, className)}
                    {...stateData(isOpen ? 'open' : 'closed')}
                    data-disabled={effectiveDisabled ? '' : undefined}
                    data-orientation={orientation}
                    data-slot="accordion-item"
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
