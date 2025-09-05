'use client';
import React from 'react';

import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Badge';
export type BadgeProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('badge', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return <div ref={ref} className={clsx(rootClass, className)} {...composedAttributes()} {...props}>
        {children}
    </div>;
});

Badge.displayName = COMPONENT_NAME;

export default Badge;
