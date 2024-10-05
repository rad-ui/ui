'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Skeleton';

const Skeleton = ({ loading = true, className = '', customRootClass = '', children, ...props }:any) => {
    // If loading is false, return the children
    if (!loading) return children;

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <span className={`${rootClass} ${className}`} {...props} >
        {children}
    </span>;
};

Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
