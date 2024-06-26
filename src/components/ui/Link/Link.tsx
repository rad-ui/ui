'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Link';

export type LinkProps = {
    children: React.ReactNode;
    href: string;
    alt?: string;
    customRootClass: string;
    className: string;
    props: Record<string, any>[];
}

// TODO: in the previous return value
// return <a href={href} alt={alt} className={`${rootClass} ${className}`} {...props}>{children}</a>;
// 'alt' prop does not exist on an anchor element
const Link = ({children, href='#', alt, customRootClass, className, ...props}: LinkProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <a href={href} className={`${rootClass} ${className}`} {...props}>{children}</a>;
};

Link.displayName = COMPONENT_NAME;

export default Link;
