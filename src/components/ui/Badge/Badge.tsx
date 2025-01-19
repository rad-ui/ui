'use client';
import React from 'react';
import BadgeRoot from './fragments/BadgeRoot';
import BadgeContent from './fragments/BadgeContent';
export type BadgeProps = {
    children?: React.ReactNode,
    customRootClass?: string,
    className?: string,
    color?: string,
    props?: object[],
}

const Badge = ({ children, customRootClass = '', className = '', color, ...props }: BadgeProps) => {
    return <BadgeRoot customRootClass={customRootClass} className={className} data-accent-color={color ?? undefined} {...props}>
        <BadgeContent>
            {children}
        </BadgeContent>
    </BadgeRoot>;
};

Badge.Root = BadgeRoot;
Badge.Content = BadgeContent;
export default Badge;
