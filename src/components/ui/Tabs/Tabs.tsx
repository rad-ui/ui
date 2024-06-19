'use client';
import React, {useState} from 'react';

import TabList from './shards/TabList';
import TabContent from './shards/TabContent';
import TabRoot from './shards/TabRoot';

import {TabProps} from './types';

export type TabsProps = {
    tabs?: TabProps[]
    props?: Record<string, any>[]
}

const Tabs = ({tabs = [], ...props}: TabsProps) => {
    // This should be a value <`tabs.value`> that is passed in from the parent component
    const [activeTab, setActiveTab] = useState(tabs[0].value || '');
    const defaultActiveTab = tabs[0].value || '';

    return (
        <TabRoot tabs={tabs} defaultTab={defaultActiveTab} >
            <TabList />
            <TabContent />
        </TabRoot>
    );
};

Tabs.List = TabList;
Tabs.Content = TabContent;
Tabs.Root = TabRoot;

export default Tabs;
