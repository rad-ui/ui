'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Quote';
const Quote = ({children, customRootClass = '', className = '', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <q className={`${rootClass} ${className}`} {...props}>{children}</q>;
};

Quote.displayName = COMPONENT_NAME;

export default Quote;
