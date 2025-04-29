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
    height:Number;
    width:Number

}

const Skeleton = ({ loading = true, className = '', customRootClass = '', children,height, width, ...props }:SkeletonProps) => {
    // If loading is false, return the children
    if (!loading) return children;

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <div className={clsx(rootClass, className)} {...props} data-height={height} data-width={width}>
        
    </div>;
};

Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
