'use client';
import React from 'react';

import TabList from './fragments/TabList';
import TabTrigger from './fragments/TabTrigger';
import TabContent from './fragments/TabContent';
import TabRoot from './fragments/TabRoot';

// Empty props type - only supporting fragment exports
export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const Tabs = () => {
    console.warn('Direct usage of Tabs is not supported. Please use Tabs.Root, Tabs.List, etc. instead.');
    return null;
};

Tabs.List = TabList;
Tabs.Content = TabContent;
Tabs.Root = TabRoot;
Tabs.Trigger = TabTrigger;

export default Tabs;
