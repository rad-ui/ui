import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useComposeAttributes, useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Separator';

export type SeparatorProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    customRootClass?: string;
    color?: string;
    size?: string;
    props?: any;
} & React.ComponentProps<'div'>;

const Separator = ({ orientation = 'horizontal', className, customRootClass, color = '', size = '', ...props } : SeparatorProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const orientationClass = orientation === 'vertical' ? `${rootClass}-vertical` : `${rootClass}-horizontal`;
    const dataAttributes = useCreateDataAttribute('separator', { size });
    const accentAttributes = useCreateDataAttribute('accent', { color });
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes())
    return <div className={clsx(rootClass, orientationClass, className)} {...composedAttributes()} {...props} ></div>;
};

Separator.displayName = COMPONENT_NAME;

export default Separator;
