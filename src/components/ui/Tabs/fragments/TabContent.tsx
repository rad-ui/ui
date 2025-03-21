'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import { TabProps } from '../types';
import TabsRootContext from '../context/TabsRootContext';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'TabContent';

export type TabContentProps ={
    tabs?: TabProps[]
    activeTab: TabProps
    className?: string;
    customRootClass?: string;
}

const TabContent = ({ className = '', value, children, customRootClass }: TabContentProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const { value: activeValue } = useContext(TabsRootContext);

    if (activeValue !== value) {
        return null;
    }

    return <div className={clsx(rootClass, className)}>
        {children}
    </div>;
};

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
