'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import FieldsetContext, { useFieldsetDescription } from '../contexts/FieldsetContext';

export type FieldsetDescriptionProps = React.ComponentPropsWithoutRef<'p'>;

const FieldsetDescription = forwardRef<HTMLParagraphElement, FieldsetDescriptionProps>(({
    children,
    className,
    id: idProp,
    ...props
}, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    useFieldsetDescription(id);
    const { rootClass } = useContext(FieldsetContext);

    return (
        <p ref={ref} id={id} className={clsx(rootClass && `${rootClass}-description`, className)} {...props} data-slot="fieldset-description">
            {children}
        </p>
    );
});

FieldsetDescription.displayName = 'FieldsetDescription';

export default FieldsetDescription;
