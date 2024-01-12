'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';
const COMPONENT_NAME = 'Strong';


export type StrongProps = {
    children: React.ReactNode,
    className?: string,
    customRootClass?: string
}

const Strong = ({children, className, customRootClass}: StrongProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <strong className={`${rootClass} ${className}`}>{children}</strong>
    );
};

Strong.displayName = COMPONENT_NAME;

export default Strong;
