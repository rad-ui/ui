'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import TabsRootContext from '../context/TabsRootContext';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TabContent';

export type TabContentProps = {
    className?: string;
    customRootClass?: string;
    value?: string;
    children?: React.ReactNode;
    asChild?: boolean;
    forceMount?: boolean;
}

const TabContent = ({ className = '', value, children, customRootClass, asChild = false, forceMount = false }: TabContentProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabContent must be used within a TabRoot');
    const { tabValue: activeValue, orientation } = context;

    const isActive = activeValue === value;
    const shouldRender = forceMount || isActive;

    if (!shouldRender) {
        return null;
    }

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-state'] = isActive ? 'active' : 'inactive';
    dataAttributes['data-orientation'] = orientation || 'horizontal';

    return <div
        className={clsx(rootClass, className)}
        role="tabpanel"
        aria-hidden={!isActive}
        {...dataAttributes}
    >
        {children}
    </div>;
};

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
