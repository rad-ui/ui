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

const Badge = ({ children, customRootClass = '', className = '', color = '', ...props }: BadgeProps) => {
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return <BadgeRoot customRootClass={customRootClass} className={className} {...data_attributes} {...props}>
        <BadgeContent>
            {children}
        </BadgeContent>
    </BadgeRoot>;
};

Badge.Root = BadgeRoot;
Badge.Content = BadgeContent;
export default Badge;
