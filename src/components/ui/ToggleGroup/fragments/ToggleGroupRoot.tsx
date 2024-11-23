import React, { useState, useRef } from 'react';

import { customClassSwitcher } from '~/core';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

import { ToggleContext } from '../contexts/toggleContext';

const ToggleGroupRoot = ({ type = 'multiple', className = '', customRootClass = '', componentName = '', value = null, children }:any) => {
    const rootClass = customClassSwitcher(customRootClass, componentName);
    const toggleGroupRef = useRef(null);
    // value can be either a string or an array of strings
    // if its null, then no toggles are active

    const [activeToggles, setActiveToggles] = useState(value || []);

    const nextItem = () => {
        const batches = getAllBatchElements(toggleGroupRef?.current);
        const nextItem = getNextBatchItem(batches);
        // setFocusItem(nextItem);
        console.log('nextItem', nextItem);
        if (nextItem) {
            nextItem.focus();
        }
    };

    const previousItem = () => {
        const batches = getAllBatchElements(toggleGroupRef?.current);
        const prevItem = getPrevBatchItem(batches);
        console.log('prevItem', prevItem);
        if (prevItem) {
            prevItem.focus();
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
        <div className={`${rootClass} ${className}`} role="group" ref={toggleGroupRef}>
            <ToggleContext.Provider
                value={sendValues}>
                {children}
            </ToggleContext.Provider>
        </div>
    );
};

export default ToggleGroupRoot;
