'use client';
import React, { useContext, useRef } from 'react';
import { clsx } from 'clsx';
import { TabProps } from '../types';

import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

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
    const { activeTab, setActiveTab, rootClass } = useContext(TabsRootContext);
    const ref = useRef<HTMLButtonElement>(null);

    const isActive = activeTab === tab.value;

    const handleFocus = (tab: TabProps) => {
        if (ref.current) {
            ref.current?.focus();
        }
        setActiveTab(tab.value);

        // This is a good way to manage flow, when a focus event is triggered, we can set the active tab to the tab that is being focused on
        // This way, we dont need to keep track of the active tab in the parent component
        // This should be the defacto pattern we should follow for all components
    };

    return (
        <RovingFocusGroup.Item
            asChild
            onFocus={() => handleFocus(tab)}
        >
            <button
                ref={ref}
                className={clsx(`${rootClass}-trigger`, `${isActive ? 'active' : ''}`, className)} role="tab"{...props}>
                {tab.label}
            </button>
        </RovingFocusGroup.Item>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
