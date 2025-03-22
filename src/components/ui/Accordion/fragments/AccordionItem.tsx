import React, { useState, useContext, useId, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

import CollapsiblePrimitive from '~/core/primitives/Collapsible';

export type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
    setItemValue?: (value: number) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className = '', ...props }) => {
    const accordionItemRef = useRef<HTMLDivElement>(null);
    const [itemValue, setItemValue] = useState(value ?? 0);
    const { rootClass, activeItem, transitionDuration, transitionTimingFunction } = useContext(AccordionContext);

    const [isOpen, setIsOpen] = useState(itemValue === activeItem);
    useEffect(() => {
        if (itemValue === activeItem) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [activeItem]);

    const id = useId();

    return (
        <AccordionItemContext.Provider value={{ itemValue, setItemValue }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                transitionDuration={transitionDuration}
                transitionTimingFunction={transitionTimingFunction}
                asChild
            >
                <div
                    ref={accordionItemRef}
                    className={clsx(`${rootClass}-item`, className)} {...props}
                    id={`accordion-data-item-${id}`}
                    role="region"
                    data-state={isOpen ? 'open' : 'closed'}
                >
                    {children}
                </div>
            </CollapsiblePrimitive.Root>

        </AccordionItemContext.Provider>
    );
};

export default AccordionItem;
