'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';
const COMPONENT_NAME = 'TabContent';

const TabContent = ({tabs = [], activeTab, className = '', customRootClass = ''}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <div className={`${rootClass} ${className}`}>
        {tabs.map((tab, index) => {
            if (tab.value === activeTab) {
                return <div key={index}>{tab.content}</div>;
            }
            return null;
        })
        }
    </div>;
};

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
