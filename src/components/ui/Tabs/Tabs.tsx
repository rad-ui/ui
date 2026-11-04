'use client';
import React from 'react';

import TabList from './fragments/TabList';
import TabTrigger from './fragments/TabTrigger';
import TabContent from './fragments/TabContent';
import TabRoot from './fragments/TabRoot';
import TabIndicator from './fragments/TabIndicator';

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
    Indicator: typeof TabIndicator;
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
Tabs.Indicator = TabIndicator;

export type { TabRootProps } from './fragments/TabRoot';
export type { TabListProps } from './fragments/TabList';
export type { TabContentProps } from './fragments/TabContent';
export type { TabTriggerProps } from './fragments/TabTrigger';
export type { TabIndicatorProps } from './fragments/TabIndicator';
// Named part exports let React Server Components use `import * as Tabs from '@radui/ui/Tabs'`;
// property access on the default export is undefined across the client boundary.
export {
    TabList as List,
    TabContent as Content,
    TabRoot as Root,
    TabTrigger as Trigger,
    TabIndicator as Indicator
};

export default Tabs;
