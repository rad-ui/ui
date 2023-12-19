'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Badge';
const Badge = ({children, customRootClass = '', className = '', color=undefined, ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (color) {
        props['data-accent-color'] = color;
    }

    return <span className={`${rootClass} ${className}`} {...props}>
        {children}
    </span>;
};

Badge.displayName = COMPONENT_NAME;

export default Badge;
