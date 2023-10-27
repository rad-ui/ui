
'use client';
import {customClassSwitcher} from '@/core';

import TabTrigger from './TabTrigger';

const COMPONENT_NAME = 'TabList';

const TabList = ({tabs = [], className='', setActiveTab, activeTab, customRootClass=''}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <div role="tablist" aria-orientation='horizontal' aria-label="todo" className={`${rootClass} ${className}`}>
        {tabs.map((tab, index) => {
            return <TabTrigger activeTab={activeTab} setActiveTab={setActiveTab} key={index} tab={tab} index={index} />;
        })
        }
    </div>;
};

TabList.displayName = COMPONENT_NAME;

export default TabList;
