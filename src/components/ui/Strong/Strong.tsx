'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';
const COMPONENT_NAME = 'Strong';


export type StrongProps = {
    children: React.ReactNode,
    className?: string,
    customRootClass?: string
    props?: any
}

const Strong = ({children, className, customRootClass, ...props}: StrongProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <strong className={`${rootClass} ${className}`} {...props} >{children}</strong>
    );
};

Strong.displayName = COMPONENT_NAME;

export default Strong;
