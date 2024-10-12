'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Separator';

export type SeparatorProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    customRootClass?: string;
    props?: any;
}

const Separator = ({ orientation = 'horizontal', className, customRootClass, ...props } : SeparatorProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const orientationClass = orientation === 'vertical' ? `${rootClass}-vertical` : `${rootClass}-horizontal`;

    return <div className={`${rootClass} ${orientationClass} ${className}`} {...props} ></div>;
};

Separator.displayName = COMPONENT_NAME;

export default Separator;
