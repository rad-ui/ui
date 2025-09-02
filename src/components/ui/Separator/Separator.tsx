import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Separator';

export type SeparatorProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    customRootClass?: string;
    color?: string;
    asChild?: boolean;
    decorative?: boolean;
    props?: any;
} & React.ComponentProps<'div'>;

const Separator = ({
    orientation = 'horizontal',
    className,
    customRootClass,
    color = '',
    asChild = false,
    decorative = false,
    ...props
}: SeparatorProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const orientationClass = orientation === 'vertical' ? `${rootClass}-vertical` : `${rootClass}-horizontal`;
    const data_attributes: Record<string, string> = {};

    // Add data-orientation attribute
    data_attributes['data-orientation'] = orientation;

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    // Add decorative role if specified
    if (decorative) {
        data_attributes.role = 'separator';
        data_attributes['aria-hidden'] = 'true';
    }

    return (
        <Primitive.div
            className={clsx(rootClass, orientationClass, className)}
            asChild={asChild}
            {...data_attributes}
            {...props}
        />
    );
};

Separator.displayName = COMPONENT_NAME;

export default Separator;
