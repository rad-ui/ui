'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const RENDER_AS_ENUMS = [
    {
        label: 'H1',
        tag: 'h1'
    },
    {
        label: 'H2',
        tag: 'h2'
    },
    {
        label: 'H3',
        tag: 'h3'
    },
    {
        label: 'H4',
        tag: 'h4'
    },
    {
        label: 'H5',
        tag: 'h5'
    },
    {
        label: 'H6',
        tag: 'h6'
    }
];

export type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    customRootClass?: string;
    className?: string;
    children?: React.ReactNode;
    props?: any;
};

const Heading = ({ children, as = 'h1', customRootClass = '', className = '', ...props }: HeadingProps) => {
    const rootClass = customClassSwitcher(customRootClass, as || 'h1');

    const tag = RENDER_AS_ENUMS.find((item) => item.tag === as) ? as : 'h1';
    
    return React.createElement(tag, { className: clsx(rootClass, className), ...props }, children);
    
    
};
Heading.displayName = 'Heading';

export default Heading;
