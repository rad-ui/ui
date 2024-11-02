'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import { TabProps } from '../types';
import TabsRootContext from '../context/TabsRootContext';
const COMPONENT_NAME = 'TabContent';

export type TabContentProps ={
    tabs?: TabProps[]
    activeTab: TabProps
    className?: string;
    customRootClass?: string;
}

const TabContent = ({ className, customRootClass }: TabContentProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const { tabs, activeTab, setActiveTab } = useContext(TabsRootContext);

    return <div className={`${rootClass} ${className}`}>
        {tabs.map((tab, index) => {
            if (tab.value === activeTab) {
                return <div key={index}>{tab.content}</div>;
            }
            return null;
        })
        }
    </div>;
};

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
