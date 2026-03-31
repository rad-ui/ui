'use client';
import React from 'react';

import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Badge';
export type BadgeProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
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
