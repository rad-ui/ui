'use client';
import React from 'react';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'TabTrigger';
const TabTrigger = ({tab, setActiveTab, activeTab, className='', customRootClass, ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const isActive = activeTab === tab.value;

    const handleClick = (tab) => {
        setActiveTab(tab.value);
    };

    return (
        <button role="tab" className={`${rootClass} ${isActive?'active':''} ${className}`} {...props} onClick={() => handleClick(tab)}>
            <span className={`${rootClass}-inner`}>
                {tab.label}
            </span>
        </button>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
