import React from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
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
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const orientationClass = rootClass ? `${rootClass}-${orientation}` : undefined;
        const data_attributes: Record<string, string> = {};

        // Add data-orientation attribute
        data_attributes['data-orientation'] = orientation;

        if (color) {
            data_attributes['data-color'] = color;
        }

        // WAI-ARIA separator semantics:
        // - A semantic separator exposes role="separator". Its implicit
        //   aria-orientation is horizontal, so only vertical is announced.
        // - A decorative separator is purely visual and is removed from the
        //   accessibility tree with role="none".
        const semanticAttributes: Record<string, string> = decorative
            ? { role: 'none' }
            : {
                role: 'separator',
                ...(orientation === 'vertical' ? { 'aria-orientation': 'vertical' } : {})
            };

        return (
            <Primitive.div
                ref={ref}
                className={clsx(rootClass, orientationClass, className)}
                {...semanticAttributes}
                {...data_attributes}
                {...props}
            />
        );
    }
);

Separator.displayName = COMPONENT_NAME;

export default Separator;
