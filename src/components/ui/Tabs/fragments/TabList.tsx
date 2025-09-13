'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'TabList';

export type TabListProps = {
    className?: string;
    children?: React.ReactNode;
    asChild?: boolean;
}

const TabList = ({ className = '', children, asChild = false }: TabListProps) => {
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabList must be used within a TabRoot');

    const { rootClass, orientation } = context;

    return <RovingFocusGroup.Group
        role="tablist"
        aria-orientation={orientation}
        aria-label="todo"
        className={clsx(`${rootClass}-list`, className)}
    >
        {children}
    </RovingFocusGroup.Group>;
};

TabList.displayName = COMPONENT_NAME;

export default TabList;
