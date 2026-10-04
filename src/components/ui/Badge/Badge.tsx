'use client';
import React from 'react';

import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Badge';
type BadgeVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
type BadgeSize = 'small' | 'medium' | 'large' | 'x-large';

export type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
    customRootClass?: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    color?: string;
};

// Rendered as a <span>: a badge is phrasing content and is commonly placed inside
// <p>, <label>, <button> or headings, where a <div> is invalid HTML (and a
// hydration error in React). The ref stays HTMLElement-typed so existing
// `useRef<HTMLDivElement>()` consumers keep compiling.
const Badge = React.forwardRef<HTMLElement, BadgeProps>(({ children, customRootClass = '', className = '', color = '', variant = 'solid', size = 'medium', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');

    const dataAttributes = createDataAttributes('badge', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return <span ref={ref as React.Ref<HTMLSpanElement>} className={clsx(rootClass, className)} {...composedAttributes} {...props}>
        {children}
    </span>;
});

Badge.displayName = COMPONENT_NAME;

export default Badge;
