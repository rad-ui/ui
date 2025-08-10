'use client';
import React, { useState, useContext, useId, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import Primitive from '~/core/primitives/Primitive';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value: string; // Required for Radix UI compatibility
    disabled?: boolean;
    asChild?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    children,
    value,
    className = '',
    disabled = false,
    asChild = false,
    ...props
}) => {
    const accordionItemRef = useRef<HTMLDivElement>(null);
    const {
        rootClass,
        activeItems,
        transitionDuration,
        transitionTimingFunction,
        disabled: rootDisabled,
        dir
    } = useContext(AccordionContext);

    const [isOpen, setIsOpen] = useState(activeItems.includes(value));
    const isDisabled = rootDisabled || disabled;

    useEffect(() => {
        setIsOpen(activeItems.includes(value));
    }, [activeItems, value]);

    const id = useId();

    return (
        <AccordionItemContext.Provider value={{ itemValue: value, setItemValue: () => {}, disabled: isDisabled }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={setIsOpen}
                disabled={isDisabled}
                transitionDuration={transitionDuration}
                transitionTimingFunction={transitionTimingFunction}
                asChild
            >
                <Primitive.div
                    ref={accordionItemRef}
                    className={clsx(`${rootClass}-item`, className)}
                    {...props}
                    id={`accordion-data-item-${id}`}
                    role="region"
                    data-state={isOpen ? 'open' : 'closed'}
                    data-disabled={isDisabled ? '' : undefined}
                    dir={dir}
                >
                    {children}
                </Primitive.div>
            </CollapsiblePrimitive.Root>
        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
