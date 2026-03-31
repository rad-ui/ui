'use client';
import React from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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

    const dataAttributes = composeAttributes(
        createDataAttributes('code', { variant, size }),
        createDataAccentColorAttribute(color)
    );

    return <code ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props}>
        {children}
    </code>;
});

Code.displayName = COMPONENT_NAME;

export default Code;
