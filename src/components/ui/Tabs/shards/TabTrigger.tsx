'use client';
import React, {useContext, useEffect, useRef} from 'react';
import {customClassSwitcher} from '~/core';
import {TabProps} from '../types';

import TabsRootContext from '../context/TabsRootContext';


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
    // use context
    const {tabs, previousTab, nextTab} = useContext(TabsRootContext);
    const ref = useRef(null);

    const handleFocusTabEvent = ()=>{
         // focus on the active tab
        if (activeTab === tab.value) {
            ref.current.focus();
        }

    }

    useEffect(() => {
       
        handleFocusTabEvent();
    }
    , [activeTab]);


    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const isActive = activeTab === tab.value;

    const handleClick = (tab: Tab) => {
        setActiveTab(tab.value);
    };

    const handleKeyDownEvent = (e: React.KeyboardEvent) => {
        if (e.key=='ArrowLeft') {
            previousTab();
        }
        if (e.key=='ArrowRight') {
            nextTab();
        }
    };

    return (
        <button
            ref={ref}
            role="tab" key={index} className={`${rootClass} ${isActive?'active':''} ${className}`} {...props} onKeyDown={handleKeyDownEvent}
            onClick={() => handleClick(tab)}>
            <span className={`${rootClass}-inner`}>
                {tab.label}
            </span>
        </button>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
