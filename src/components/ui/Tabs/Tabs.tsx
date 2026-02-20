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

// Define compound component type
interface TabsComponent extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
    List: typeof TabList;
    Content: typeof TabContent;
    Root: typeof TabRoot;
    Trigger: typeof TabTrigger;
}

// Empty implementation - we don't support direct usage
const Tabs = React.forwardRef<React.ElementRef<'div'>, TabsProps>((_props, _ref) => {
    console.warn('Direct usage of Tabs is not supported. Please use Tabs.Root, Tabs.List, etc. instead.');
    return null;
}) as TabsComponent;

Tabs.displayName = 'Tabs';

Tabs.List = TabList;
Tabs.Content = TabContent;
Tabs.Root = TabRoot;
Tabs.Trigger = TabTrigger;

export default Tabs;
