'use client';
import React from 'react';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'Em';

const Em = ({children, customRootClass = '', className = '', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <em className={`${rootClass} ${className}`} {...props}>
        {children}
    </em>;
};

Em.displayName = COMPONENT_NAME;

export default Em;
