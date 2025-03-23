'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Tabs';

export type TabRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    color?: string;
    defaultTab?: string;
    [key: string]: any;
};

type TabRootComponentProps = TabRootProps & {
  onValueChange?: (value: string) => void
};

const TabRoot = ({
    children,
    defaultTab = '',
    onValueChange = () => {},
    customRootClass = '',
    className,
    color,
    ...props
}: TabRootComponentProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [value, setValue] = useState(defaultTab);

    const handleTabChange = (value: string) => {
        setValue(value);
        onValueChange(value);
    };

    const contextValues = {
        rootClass,
        value,
        setValue,
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
