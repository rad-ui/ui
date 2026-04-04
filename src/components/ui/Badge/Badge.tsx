'use client';
import React from 'react';

import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Badge';
type BadgeVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
type BadgeSize = 'small' | 'medium' | 'large' | 'x-large';

export type BadgeProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    color?: string;
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ children, customRootClass = '', className = '', color = '', variant = 'solid', size = 'medium', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('badge', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return <div ref={ref} className={clsx(rootClass, className)} {...composedAttributes} {...props}>
        {children}
    </div>;
});

Badge.displayName = COMPONENT_NAME;

export default Badge;
