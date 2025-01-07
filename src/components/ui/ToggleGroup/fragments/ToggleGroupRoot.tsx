import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

import { ToggleContext } from '../contexts/toggleContext';

const ToggleGroupRoot = ({ type = 'multiple', className = '', loop = true, customRootClass = '', componentName = '', value = null, children }:any) => {
    const rootClass = customClassSwitcher(customRootClass, componentName);
    const toggleGroupRef = useRef(null);
    // value can be either a string or an array of strings
    // if its null, then no toggles are active

    const [activeToggles, setActiveToggles] = useState(value || []);

    const nextItem = () => {
        const currentRef = toggleGroupRef.current;
        if (currentRef) {
            const batches = getAllBatchElements(currentRef);
            const nextItem = getNextBatchItem(batches, loop);
            if (nextItem) {
                (nextItem as HTMLElement)?.focus();
            }
        }
    };

    const previousItem = () => {
        const currentRef = toggleGroupRef?.current;
        if (currentRef) {
            const batches = getAllBatchElements(currentRef);
            const prevItem = getPrevBatchItem(batches, loop);
            if (prevItem) {
                (prevItem as HTMLElement)?.focus();
            }
        }
    };

    const sendValues = {
        nextItem,
        previousItem,
        activeToggles,
        setActiveToggles,
        type
    };

    return (
        <div className={clsx(rootClass, className)} role="group" ref={toggleGroupRef}>
            <ToggleContext.Provider
                value={sendValues}>
                {children}
            </ToggleContext.Provider>
        </div>
    );
};

export default ToggleGroupRoot;
