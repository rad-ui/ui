'use client';
import React, { useContext } from 'react';

import TabTrigger from './TabTrigger';
import { TabProps } from '../types';
import TabsRootContext from '../context/TabsRootContext';

const COMPONENT_NAME = 'TabList';

export type TabListProps = {
    tabs?: Tab[]
    className?: string;
    customRootClass?: string;
    setActiveTab: React.Dispatch<Tab>;
    activeTab: TabProps;
}

const TabList = ({ className = '', children }: TabListProps) => {
    const { rootClass } = useContext(TabsRootContext);
    return <div role="tablist" aria-orientation='horizontal' aria-label="todo" className={`${rootClass}-list ${className}`}>
        {children}
    </div>;
};

TabList.displayName = COMPONENT_NAME;

export default TabList;
