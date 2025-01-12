'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Skeleton';

export type SkeletonProps = {
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;
    loading?: boolean;
};

const Skeleton: React.FunctionComponent<SkeletonProps> = ({ loading = true, className = '', customRootClass = '', children, ...props }) => {
    // If loading is false, return the children
    if (!loading) return children;

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <span className={clsx(rootClass, className)} {...props} >
        {children}
    </span>;
};

Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
