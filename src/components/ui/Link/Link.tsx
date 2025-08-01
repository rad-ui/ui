'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Link';

export type LinkProps = {
    children: React.ReactNode;
    href: string;
    customRootClass?: string;
    size?: string;
    className?: string;
    props?: Record<string, any>[];
}

// TODO: in the previous return value
// return <a href={href} alt={alt} className={clsx(rootClass, className)} {...props}>{children}</a>;
// 'alt' prop does not exist on an anchor element
const Link = ({ children, href = '#', customRootClass, className, size = '', ...props }: LinkProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('link', { size });
    // @ts-ignore
    return <Primitive.a href={href} className={clsx(rootClass, className)} {...dataAttributes()} {...props}>{children}</Primitive.a>;
};

Link.displayName = COMPONENT_NAME;

export default Link;
