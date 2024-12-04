'use client';
import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';

import TabsRootContext from '../context/TabsRootContext';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

const COMPONENT_NAME = 'Tabs';

const TabRoot = ({ children, defaultTab = '', customRootClass, tabs = [], className, color, ...props }: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const tabRef = useRef(null);

    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].value || '');

    const nextTab = () => {
        const batches = getAllBatchElements(tabRef?.current);
        const nextItem = getNextBatchItem(batches);
        nextItem.focus();
    };

    const previousTab = () => {
        const batches = getAllBatchElements(tabRef?.current);
        const prevItem = getPrevBatchItem(batches);
        prevItem.focus();
    };

    const contextValues = {
        rootClass,
        activeTab,
        setActiveTab,
        nextTab,
        previousTab,
        tabs
    };

    return (
        <TabsRootContext.Provider
            value={contextValues}>
            <div ref={tabRef} className={`${rootClass} ${className}`} data-accent-color={color} {...props} >
                {children}
            </div>
        </TabsRootContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
