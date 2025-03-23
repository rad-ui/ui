'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import TabsRootContext from '../context/TabsRootContext';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TabContent';

export type TabProps = {
    label: string;
    value: string;
    content: React.ReactNode;
};

export type TabContentProps = {
    tabs?: TabProps[]
    activeTab?: TabProps
    className?: string;
    customRootClass?: string;
    value?: string;
    children?: React.ReactNode;
}

const TabContent = ({ className = '', value, children, customRootClass }: TabContentProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabContent must be used within a TabRoot');
    const { tabValue: activeValue } = context;

    if (activeValue !== value) {
        return null;
    }

    return <div className={clsx(rootClass, className)}>
        {children}
    </div>;
};

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
