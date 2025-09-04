'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Code';

export type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
};

const Code = React.forwardRef<React.ElementRef<'code'>, CodeProps>(({
    children,
    customRootClass = '',
    color = '',
    variant = '',
    size = '',
    className,
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-code-variant'] = variant;
    }

    if (size) {
        data_attributes['data-code-size'] = size;
    }

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return <code ref={ref} className={clsx(rootClass, className)} {...data_attributes} {...props}>
        {children}
    </code>;
});

Code.displayName = COMPONENT_NAME;

export default Code;
