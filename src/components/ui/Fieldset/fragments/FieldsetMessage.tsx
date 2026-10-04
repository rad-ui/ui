'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import FieldsetContext, { useFieldsetDescription } from '../contexts/FieldsetContext';

export type FieldsetMessageProps = {
    invalid?: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

const FieldsetMessage = forwardRef<HTMLParagraphElement, FieldsetMessageProps>(({
    children,
    className,
    id: idProp,
    invalid,
    role,
    ...props
}, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    useFieldsetDescription(id);
    const { rootClass, invalid: fieldsetInvalid } = useContext(FieldsetContext);
    // A message inherits the fieldset's invalid state unless it sets its own.
    const isInvalid = invalid ?? fieldsetInvalid;

    return (
        <p
            ref={ref}
            id={id}
            className={clsx(rootClass && `${rootClass}-message`, className)}
            {...props}
            role={role ?? (isInvalid ? 'alert' : undefined)}
            data-invalid={isInvalid ? '' : undefined}
            data-slot="fieldset-message"
        >
            {children}
        </p>
    );
});

FieldsetMessage.displayName = 'FieldsetMessage';

export default FieldsetMessage;
