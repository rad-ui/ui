'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Separator';

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    customRootClass?: string
}

const Separator = ({orientation = 'horizontal', className, customRootClass} : SeparatorProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const orientationClass = orientation === 'vertical'? `${rootClass}-vertical` : `${rootClass}-horizontal`;

    return <div className={`${rootClass} ${orientationClass} ${className}`}></div>;
};

Separator.displayName = COMPONENT_NAME;

export default Separator;
