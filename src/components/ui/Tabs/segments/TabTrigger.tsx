'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';
import {TabProps} from '../types';

const COMPONENT_NAME = 'TabTrigger';

export type TabTriggerProps = {
    tab: TabProps;
    setActiveTab: React.Dispatch<Tab>;
    activeTab: TabProps;
    className?: string;
    customRootClass?: string;
    index: number;
    props?: Record<string, any>[]
}

const TabTrigger = ({tab, setActiveTab, activeTab, className, customRootClass, index, ...props}: TabTriggerProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const isActive = activeTab === tab.value;

    const handleClick = (tab: Tab) => {
        setActiveTab(tab.value);
    };

    return (
        <button role="tab" key={index} className={`${rootClass} ${isActive?'active':''} ${className}`} {...props} onKeyDown={(e)=>{
            console.log(e.key);
        }} onClick={() => handleClick(tab)}>
            <span className={`${rootClass}-inner`}>
                {tab.label}
            </span>
        </button>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
