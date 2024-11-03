'use client';
import React, { ReactNode } from 'react';

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
interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    customRootClass?: string;
    className?: string;
    [key: string]: any; // To allow any other props (optional)
}

const Heading: React.FC<HeadingProps> = ({children, as = 'h1', customRootClass = '', className = '', ...props }) => {
    const rootClass = customClassSwitcher(customRootClass, as);
    const Tag = RENDER_AS_ENUMS.find((item) => item.tag === as)?.tag || 'h1';

    return <Tag className={`${rootClass} ${className}`} {...props}>{children}</Tag>;
};
Heading.displayName = 'Heading';

export default Heading;
