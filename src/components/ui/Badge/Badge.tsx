'use client';
import React from 'react';

import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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

    const dataAttributes = useCreateDataAttribute('button', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <div className={clsx(rootClass, className)} {...composedAttributes()} {...props}>
        {children}
    </div>;
};

export default Badge;
