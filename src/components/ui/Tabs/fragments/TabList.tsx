'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import { TabProps } from '../types';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'TabList';

// Define the Tab type if it's not imported
type Tab = string | number;

export type TabListProps = {
    tabs?: Tab[]
    className?: string;
    customRootClass?: string;
    setActiveTab: React.Dispatch<Tab>;
    activeTab: TabProps;
    children?: React.ReactNode;
}

const TabList = ({ className = '', children }: TabListProps) => {
    const { rootClass } = useContext(TabsRootContext);
    return <RovingFocusGroup.Group role="tablist" aria-orientation='horizontal' aria-label="todo" className={clsx(`${rootClass}-list`, className)}>
        {children}
    </RovingFocusGroup.Group>;
};

TabList.displayName = COMPONENT_NAME;

export default TabList;
