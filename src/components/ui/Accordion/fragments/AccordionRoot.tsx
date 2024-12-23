import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
}

const AccordionRoot = ({ children, customRootClass }: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<number | null>(null); // keeps track of the active item, stores the
    const [focusItem, setFocusItem] = useState<Element | null>(null); // stores the item that should be focused

    const focusNextItem = () => {
        if (accordionRef?.current == null) {
            return;
        }

        const batches = getAllBatchElements(accordionRef?.current);
        const nextItem = getNextBatchItem(batches);
        setFocusItem(nextItem);
        if (nextItem) {
            const button = nextItem.querySelector('button');
            // focus button
            button?.focus();
        }
    };

    const focusPrevItem = () => {
        if (accordionRef?.current == null) {
            return;
        }

        const batches = getAllBatchElements(accordionRef?.current);
        const prevItem = getPrevBatchItem(batches);
        setFocusItem(prevItem);
        if (prevItem) {
            const button = prevItem.querySelector('button');
            // focus button
            button?.focus();
        }
    };

    return (
        <AccordionContext.Provider
            value={{
                rootClass,
                activeItem,
                setActiveItem,
                focusNextItem,
                focusPrevItem,
                focusItem,
                setFocusItem
            }}>
            <div className={clsx(`${rootClass}-root`)} ref={accordionRef} data-testid="accordion-root">
                {children}
            </div>
        </AccordionContext.Provider>

    );
};

export default AccordionRoot;
