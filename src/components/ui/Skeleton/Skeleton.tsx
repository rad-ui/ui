'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';
const COMPONENT_NAME = 'Skeleton';

const Skeleton = ({ loading = true, className = '', customRootClass = '', children, ...props }:any) => {
    // If loading is false, return the children
    if (!loading) return children;

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <Primitive.span className={clsx(rootClass, className)} {...props} asChild>
        {children}
    </Primitive.span>;
};

Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
