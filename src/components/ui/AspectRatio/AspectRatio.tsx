'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'AspectRatio';

export type AspectRatioProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    ratio?: string;
    props: Record<string, any>[];
}

const AspectRatio = ({ children, customRootClass, className, ratio="1", ...props }: AspectRatioProps) => {

    if (isNaN(Number(ratio)) && !ratio.match(/^(\d+)\/(\d+)$/)) ratio = "1"
    if (Number(ratio) <= 0) ratio = "1"

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <div style={{aspectRatio:ratio}} className={clsx(rootClass, className)} {...props}>{children} </div>
}
AspectRatio.displayName = COMPONENT_NAME;

export default AspectRatio;