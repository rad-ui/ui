'use client';
import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Tabs';

const TabRoot = ({ children, defaultTab = '', customRootClass, tabs = [], className, color, ...props }: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const tabRef = useRef(null);

    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].value || '');

    const contextValues = {
        rootClass,
        activeTab,
        setActiveTab,
        tabs
    };

    return (
        <TabsRootContext.Provider
            value={contextValues}>
            <RovingFocusGroup.Root ref={tabRef} className={clsx(rootClass, className)} data-accent-color={color} {...props}>
                {children}
            </RovingFocusGroup.Root>

        </TabsRootContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
