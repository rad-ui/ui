import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const COMPONENT_NAME = 'Separator';

type SeparatorElement = ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>;

export type SeparatorProps = {
    orientation?: 'horizontal' | 'vertical';
    customRootClass?: string;
    color?: string;
    decorative?: boolean;
} & PrimitiveDivProps;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>(
    (
        {
            orientation = 'horizontal',
            className,
            customRootClass,
            color = '',
            decorative = false,
            ...props
        },
        ref
    ) => {
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
                ref={ref}
                className={clsx(rootClass, orientationClass, className)}
                {...data_attributes}
                {...props}
            />
        );
    }
);

Separator.displayName = COMPONENT_NAME;

export default Separator;
