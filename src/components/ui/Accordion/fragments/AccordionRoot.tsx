import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { AccordionContext } from '../contexts/AccordionContext';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

const COMPONENT_NAME = 'Accordion';

export type AccordionRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    variant?: string | ''
}

const AccordionRoot = ({ children, customRootClass, variant = '' }: AccordionRootProps) => {
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [focusItem, setFocusItem] = useState<Element | null>(null); // stores the id of the item that should be focused

    const dataAttributes: Record<string, string> = {};
    if (variant) {
        dataAttributes['data-variant'] = variant;
    }

    useEffect(() => {}, []);

    const focusNextItem = () => {
        if (!accordionRef.current) return;
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
        if (!accordionRef.current) return;
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
                setFocusItem,
                accordionRef

            }}>
            <div className={clsx(`${rootClass}-root`)} ref={accordionRef} {...dataAttributes} >
                {children}
            </div>
        </AccordionContext.Provider>

    );
};

export default AccordionRoot;
