'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';

import TabsRootContext from '../context/TabsRootContext';

const COMPONENT_NAME = 'Tabs';

const TabRoot = ({ children, defaultTab = '', customRootClass, tabs = [], className, color, ...props }: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].value || '');

    const nextTab = () => {
        const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
        const nextIndex = currentIndex + 1;
        if (nextIndex < tabs.length) {
            setActiveTab(tabs[nextIndex].value);
        }

        return tabs[nextIndex];
    };

    const previousTab = () => {
        const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            setActiveTab(tabs[previousIndex].value);
        }

        return tabs[previousIndex];
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
            <div className={`${rootClass} ${className}`} data-accent-color={color} {...props} >
                {children}
            </div>
        </TabsRootContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
