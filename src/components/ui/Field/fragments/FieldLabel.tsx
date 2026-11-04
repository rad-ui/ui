'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useFieldContext } from '../contexts/FieldContext';

export type FieldLabelElement = ElementRef<typeof Primitive.label>;
export type FieldLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>;

const FieldLabel = forwardRef<FieldLabelElement, FieldLabelProps>(({ className, htmlFor, ...props }, ref) => {
    const { rootClass, controlId, stateAttributes } = useFieldContext('Label');

    return (
        <Primitive.label
            ref={ref}
            htmlFor={htmlFor ?? controlId}
            className={clsx(rootClass && `${rootClass}-label`, className)}
            {...props}
            {...stateAttributes}
            data-slot="field-label"
        />
    );
});

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
