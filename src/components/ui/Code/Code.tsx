'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Code';

export type CodeProps= {
    children: React.ReactNode;
    customRootClass?: string;
    color?: string;
}

const Code = ({ children, customRootClass = '', color='' }: CodeProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return <code className={clsx(rootClass)} {...data_attributes}>
        {children}
    </code>;
};

export default Code;
