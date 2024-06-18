
'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

import TabsContext from '../context/TabsContext';

import {TabRootProps} from '../types';

const COMPONENT_NAME = 'Tabs';


const TabRoot = ({children, customRootClass, className, color, ...props}: TabRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <TabsContext.Provider value={null}>
            <div className={`${rootClass} ${className}`} data-accent-color={color} {...props} >
                {children}
            </div>
        </TabsContext.Provider>
    );
};

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
