
'use client';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'TabList';

const TabList = ({tabs = [], className='', setActiveTab, customRootClass=''}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const handleClick = (tab) => {
        setActiveTab(tab.value);
    };

    return <div className={`${rootClass} ${className}`}>
        {tabs.map((tab, index) => {
            return <button onClick={() => {
                handleClick(tab);
            }} className='border' key={index}>{tab.label}</button>;
        })
        }
    </div>;
};

TabList.displayName = COMPONENT_NAME;

export default TabList;
