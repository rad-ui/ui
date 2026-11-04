'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useFieldContext, useFieldDescription } from '../contexts/FieldContext';

export type FieldDescriptionElement = ElementRef<typeof Primitive.p>;
export type FieldDescriptionProps = ComponentPropsWithoutRef<typeof Primitive.p>;

/** Help text for the control, added to its accessible description. */
const FieldDescription = forwardRef<FieldDescriptionElement, FieldDescriptionProps>(({ className, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    useFieldDescription(id, 'description');
    const { rootClass, stateAttributes } = useFieldContext('Description');

    return (
        <Primitive.p
            ref={ref}
            id={id}
            className={clsx(rootClass && `${rootClass}-description`, className)}
            {...props}
            {...stateAttributes}
            data-slot="field-description"
        />
    );
});

FieldDescription.displayName = 'FieldDescription';

export default FieldDescription;
