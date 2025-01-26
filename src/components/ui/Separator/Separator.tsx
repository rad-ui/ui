import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Separator';

export type SeparatorProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    customRootClass?: string;
    color?: string;
    props?: any;
} & React.ComponentProps<'div'>;

const Separator = ({ orientation = 'horizontal', className, customRootClass, color='', ...props } : SeparatorProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const orientationClass = orientation === 'vertical' ? `${rootClass}-vertical` : `${rootClass}-horizontal`;
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }
    return <div className={clsx(rootClass, orientationClass, className)} {...props} {...data_attributes}></div>;
};

Separator.displayName = COMPONENT_NAME;

export default Separator;
