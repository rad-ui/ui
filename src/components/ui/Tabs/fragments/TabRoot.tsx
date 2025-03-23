'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Tabs';

export type TabRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    value?: string;
    color?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

const TabRoot = ({
    children,
    defaultValue = '',
    onValueChange = () => {},
    customRootClass = '',
    value,
    className,
    color,
    ...props
}: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [tabValue, setTabValue] = useControllableState<string>(
        value,
        defaultValue || '',
        onValueChange
    );

    const handleTabChange = (value: string) => {
        setTabValue(value);
    };

    const contextValues = {
        rootClass,
        tabValue,
        handleTabChange
    };

    return (
        <TabsRootContext.Provider value={contextValues}>
            <RovingFocusGroup.Root direction="horizontal" loop className={clsx(rootClass, className)} data-accent-color={color} {...props}>
                {children}
            </RovingFocusGroup.Root>
        </TabsRootContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
