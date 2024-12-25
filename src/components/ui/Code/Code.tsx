'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Code';

export type CodeProps= {
    children: React.ReactNode;
    customRootClass?: string;
}

const Code = ({ children, customRootClass = '' }: CodeProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <code className={clsx(rootClass)}>
        {children}
    </code>;
};

export default Code;
