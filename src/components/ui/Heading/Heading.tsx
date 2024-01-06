'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';


interface HeadingProps {
    children: React.ReactNode;
    as?: keyof typeof RENDER_AS_ENUMS;
    customRootClass?: string;
    className?: string;
    props?: Record<string, any>[];
}

const RENDER_AS_ENUMS = {
    h1: ({children, props, className, customRootClass}: HeadingProps) => <h1 className={`${customRootClass} ${className}`} {...props}>{children}</h1>,
    h2: ({children, props, className, customRootClass}: HeadingProps) => <h2 className={`${customRootClass} ${className}`} {...props}>{children}</h2>,
    h3: ({children, props, className, customRootClass}: HeadingProps) => <h3 className={`${customRootClass} ${className}`} {...props}>{children}</h3>,
    h4: ({children, props, className, customRootClass}: HeadingProps) => <h4 className={`${customRootClass} ${className}`} {...props}>{children}</h4>,
    h5: ({children, props, className, customRootClass}: HeadingProps) => <h5 className={`${customRootClass} ${className}`} {...props}>{children}</h5>,
    h6: ({children, props, className, customRootClass}: HeadingProps) => <h6 className={`${customRootClass} ${className}`} {...props}>{children}</h6>,
} as const

const Heading = ({children, as = 'h1', customRootClass, className, props}: HeadingProps) => {
    const rootClass = customClassSwitcher(customRootClass, as);
    const Tag = RENDER_AS_ENUMS[as];
    return <Tag className={`${rootClass} ${className}`} {...props}>{children}</Tag>;
};

Heading.displayName = 'Heading';

export default Heading;