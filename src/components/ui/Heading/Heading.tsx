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

const Heading = ({ children, as = undefined, customRootClass = '', className = '', ...props }) => {
    const rootClass = customClassSwitcher(customRootClass, as || 'h1');

    if (as !== undefined && RENDER_AS_ENUMS.find((item) => item.tag === as)) {
        const { tag: Tag } = RENDER_AS_ENUMS.find((item) => item.tag === as);
        return <Tag className={clsx(rootClass, className)} {...props}>{children}</Tag>;
    }
    return <h1 className={clsx(rootClass, className)} {...props}>{children}</h1>;
};
Heading.displayName = 'Heading';

export default Heading;
