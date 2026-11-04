'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useFieldContext } from '../contexts/FieldContext';

export type FieldLabelElement = ElementRef<typeof Primitive.label>;
export type FieldLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>;

const FieldLabel = forwardRef<FieldLabelElement, FieldLabelProps>(({ className, htmlFor, onClick, ...props }, ref) => {
    const { rootClass, controlId, stateAttributes } = useFieldContext('Label');

    return (
        <Primitive.label
            ref={ref}
            htmlFor={htmlFor ?? controlId}
            className={clsx(rootClass && `${rootClass}-label`, className)}
            {...props}
            onClick={(event: React.MouseEvent<HTMLLabelElement>) => {
                onClick?.(event);
                if (event.defaultPrevented) return;
                // A label click activates its control. For a popup trigger (Select, Combobox) that
                // would open the popup; focus it instead, like the label of a native <select>.
                const control = event.currentTarget.ownerDocument.getElementById(htmlFor ?? controlId);
                if (control?.hasAttribute('aria-haspopup')) {
                    event.preventDefault();
                    control.focus();
                }
            }}
            {...stateAttributes}
            data-slot="field-label"
        />
    );
});

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
