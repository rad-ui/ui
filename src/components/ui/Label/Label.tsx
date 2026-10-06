'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Label';

export type LabelElement = ElementRef<'label'>;
export type LabelProps = ComponentPropsWithoutRef<'label'> & {
    /** Render the child element instead of a <label>, merging props onto it. */
    asChild?: boolean;
    /** Overrides the generated root class. */
    customRootClass?: string;
};

const INTERACTIVE_DESCENDANT = 'button, input, select, textarea';

const Label = forwardRef<LabelElement, LabelProps>(({ className, customRootClass, onMouseDown, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    return (
        <Primitive.label
            {...props}
            ref={ref}
            className={clsx(rootClass, className)}
            data-slot="label"
            onMouseDown={(event: React.MouseEvent<HTMLLabelElement>) => {
                onMouseDown?.(event);
                // Don't select the label text on double-click (as Radix Label does),
                // but leave controls nested inside the label alone.
                if ((event.target as HTMLElement).closest(INTERACTIVE_DESCENDANT)) return;
                if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
            }}
        />
    );
});

Label.displayName = COMPONENT_NAME;

export default Label;
