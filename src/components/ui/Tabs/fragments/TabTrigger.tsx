'use client';
import React, { useContext, useRef } from 'react';
import { clsx } from 'clsx';
import { TabProps } from './TabContent';

import TabsRootContext, { TabsRootContextType } from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type TabTriggerProps = {
    tab?: TabProps;
    className?: string;
    props?: Record<string, any>[];
    value?: string;
    children?: React.ReactNode;
}

const TabTrigger = ({ value, children, className = '', ...props }: TabTriggerProps) => {
    // use context
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabTrigger must be used within a TabRoot');
    const { tabValue: activeValue, handleTabChange, rootClass } = context;

    const ref = useRef<HTMLButtonElement>(null);

    const isActive = value === activeValue;

    const handleFocus = (tabValue: string) => {
        if (ref.current) {
            ref.current?.focus();
        }
        handleTabChange(tabValue);
    };

    return (
        <RovingFocusGroup.Item
            onFocus={() => value && handleFocus(value)}
        >
            <button
                ref={ref}
                className={clsx(`${rootClass}-trigger`, `${isActive ? 'active' : ''}`, className)} role="tab"{...props}>
                {children}
            </button>
        </RovingFocusGroup.Item>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
