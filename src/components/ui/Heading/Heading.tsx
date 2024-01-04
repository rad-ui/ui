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
    H1: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h1 className={`${customRootClass} ${className}`} {...props}>{children}</h1>,
    H2: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h2 className={`${customRootClass} ${className}`} {...props}>{children}</h2>,
    H3: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h3 className={`${customRootClass} ${className}`} {...props}>{children}</h3>,
    H4: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h4 className={`${customRootClass} ${className}`} {...props}>{children}</h4>,
    H5: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h5 className={`${customRootClass} ${className}`} {...props}>{children}</h5>,
    H6: ({children, props, className, customRootClass}: Exclude<HeadingProps, 'as'>) => <h6 className={`${customRootClass} ${className}`} {...props}>{children}</h6>,
} as const

const Heading = ({children, as, customRootClass, className, props}: HeadingProps) => {
    const rootClass = customClassSwitcher(customRootClass, as || 'h1');

    if (as !== undefined) {
        const Tag = RENDER_AS_ENUMS[as];
        return <Tag className={`${rootClass} ${className}`} {...props}>{children}</Tag>;
    }

    return <h1 className={`${rootClass} ${className}`} {...props}>{children}</h1>;
};
Heading.displayName = 'Heading';

export default Heading;
