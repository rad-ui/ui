'use client';
import React from 'react';
import BadgeRoot from './shards/BadgeRoot';

const COMPONENT_NAME = 'Badge';

export type BadgeProps = {
    children?: React.ReactNode,
    customRootClass?: string,
    className?: string,
    color?: string,
    props?: object[],
}

const Badge = ({ children, customRootClass, className, color, ...props }: BadgeProps) => {
    
    return <BadgeRoot customRootClass={customRootClass} className={`${className}`} color={color ?? undefined} {...props}>
        
        {children}
    </BadgeRoot>
};

Badge.displayName = COMPONENT_NAME;

Badge.Root = BadgeRoot;
export default Badge;
