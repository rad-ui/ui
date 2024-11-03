'use client';
import React, { useContext, useRef } from 'react';

import { TabProps } from '../types';

import TabsRootContext from '../context/TabsRootContext';

export type TabTriggerProps = {
    tab: TabProps;
    setActiveTab: React.Dispatch<Tab>;
    activeTab: TabProps;
    className?: string;
    customRootClass?: string;
    index: number;
    props?: Record<string, any>[]
}

const TabTrigger = ({ tab, className = '', ...props }: TabTriggerProps) => {
    // use context
    const { tabs, previousTab, nextTab, activeTab, setActiveTab, rootClass } = useContext(TabsRootContext);
    const ref = useRef(null);

    const isActive = activeTab === tab.value;

    const handleClick = (tab: TabProps) => {
        setActiveTab(tab.value);
    };

    const handleKeyDownEvent = (e: React.KeyboardEvent) => {
        if (e.key == 'ArrowLeft') {
            const tab = previousTab();
            console.log(tab);
        }
        if (e.key == 'ArrowRight') {
            const tab = nextTab();
            console.log(tab);
        }
    };

    const handleFocus = (tab: TabProps) => {
        ref.current.focus();
        setActiveTab(tab.value);

        // This is a really cool idea, when a focus event is triggered, we can set the active tab to the tab that is being focused on
        // This way, we dont need to keep track of the active tab in the parent component
        // This should be the defacto pattern we should follow for all components
    };

    return (
        <button
            ref={ref}
            role="tab" className={`${rootClass}-trigger ${isActive ? 'active' : ''} ${className}`} {...props} onKeyDown={handleKeyDownEvent}
            onClick={() => handleClick(tab)}
            onFocus={() => handleFocus(tab)}
            tabIndex={isActive ? 0 : -1}
            data-rad-ui-batch-element
        >
            {tab.label}
        </button>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
