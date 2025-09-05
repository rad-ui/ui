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
    value?: number | string;
    disabled?: boolean;
    asChild?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className = '', disabled = false, asChild = false, ...props }) => {
    const accordionItemRef = useRef<HTMLDivElement>(null);
    const [itemValue, setItemValue] = useState<number | string>(value ?? 0);
    const { rootClass, activeItems, transitionDuration, transitionTimingFunction } = useContext(AccordionContext);

    const [isOpen, setIsOpen] = useState(activeItems.includes(itemValue));
    useEffect(() => {
        setIsOpen(activeItems.includes(itemValue));
    }, [activeItems, itemValue]);

    const id = useId();

    // Update itemValue if value prop changes
    useEffect(() => {
        if (value !== undefined && value !== itemValue) {
            setItemValue(value);
        }
    }, [value]);

    return (
        <AccordionItemContext.Provider value={{ itemValue, setItemValue, disabled }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={setIsOpen}
                disabled={disabled}
                transitionDuration={transitionDuration}
                transitionTimingFunction={transitionTimingFunction}
                asChild
            >
                <Primitive.div
                    ref={accordionItemRef}
                    className={clsx(`${rootClass}-item`, className)} {...props}
                    id={`accordion-data-item-${id}`}
                    role="region"
                    data-state={isOpen ? 'open' : 'closed'}
                >
                    {children}
                </Primitive.div>
            </CollapsiblePrimitive.Root>

        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
