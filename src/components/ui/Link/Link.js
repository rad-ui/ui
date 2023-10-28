'use client';
import React from 'react';

import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'Link';
const Link = ({children, href='#', alt='', customRootClass = '', className = '', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <a href={href} alt={alt} className={`${rootClass} ${className}`} {...props}>{children}</a>;
};

Link.displayName = COMPONENT_NAME;

export default Link;
