'use client';
import React from 'react';

import TabList from './fragments/TabList';
import TabTrigger from './fragments/TabTrigger';
import TabContent from './fragments/TabContent';
import TabRoot from './fragments/TabRoot';

import { TabProps } from './types';

export type TabsProps = {
    tabs?: TabProps[]
    props?: Record<string, any>[]
}

const Tabs = ({ tabs = [], ...props }: TabsProps) => {
    // This should be a value <`tabs.value`> that is passed in from the parent component

    const defaultActiveTab = tabs[0].value || '';

    return (
        <TabRoot tabs={tabs} defaultTab={defaultActiveTab} >
            <TabList>
                {tabs.map((tab) => (
                    <TabTrigger key={tab.value} tab={tab} />
                ))}
            </TabList>
            <TabContent />
        </TabRoot>
    );
};

Tabs.List = TabList;
Tabs.Content = TabContent;
Tabs.Root = TabRoot;
Tabs.Trigger = TabTrigger;

export default Tabs;
