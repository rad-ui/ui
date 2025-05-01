'use client';
import React from 'react';

import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'Badge';
export type BadgeProps = {
    children?: React.ReactNode,
    customRootClass?: string,
    className?: string,
    variant?: string,
    size?: string,
    color?: string,
    props?: object[],
}

const Badge = ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }: BadgeProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-badge-variant'] = variant;
    }

    if (size) {
        data_attributes['data-badge-size'] = size;
    }

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return <div className={clsx(rootClass, className)} {...data_attributes} {...props}>
        {children}
    </div>;
};

export default Badge;
