'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Skeleton';

export type SkeletonProps = {
    loading:boolean;
    className?:string;
    customRootClass?:string;
    children:React.ReactNode;
    height:string;
    width:string;
    radius?:string;

}

const Skeleton = ({ loading = true, className = '', customRootClass = '', children, height, width, radius, ...props }:SkeletonProps) => {
    // If loading is false, return the children
    if (!loading) return children;

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <div
        className={clsx(rootClass, className)} {...props} style={{

            ['--skeleton-height' as any]: height,
            ['--skeleton-width' as any]: width,
            ['--skeleton-radius' as any]: radius
        }}
    >
    </div>;
};

Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
