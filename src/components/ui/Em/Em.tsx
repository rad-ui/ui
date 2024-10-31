'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Em';

export type EmProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    props: Record<string, any>[]
}

const Em = ({ children, customRootClass, className, ...props }: EmProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <em className={`${rootClass} ${className}`} {...props}>
        {children}
    </em>;
};

Em.displayName = COMPONENT_NAME;

export default Em;
