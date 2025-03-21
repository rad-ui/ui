'use client';
import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Tabs';

const TabRoot = ({ children, defaultTab = '', onValueChange = () => {}, customRootClass = '', className, color, ...props }: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const tabRef = useRef(null);

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
            <RovingFocusGroup.Root direction="horizontal" loop ref={tabRef} className={clsx(rootClass, className)} data-accent-color={color} {...props}>
                {children}
            </RovingFocusGroup.Root>
        </TabsRootContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
