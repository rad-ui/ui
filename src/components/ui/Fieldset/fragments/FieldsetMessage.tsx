'use client';

import React, { forwardRef } from 'react';

export type FieldsetMessageProps = {
    invalid?: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

const FieldsetMessage = forwardRef<HTMLParagraphElement, FieldsetMessageProps>(({
    children,
    invalid,
    role,
    ...props
}, ref) => (
    <p
        ref={ref}
        {...props}
        role={role ?? (invalid ? 'alert' : undefined)}
        data-invalid={invalid ? '' : undefined}
        data-slot="fieldset-message"
    >
        {children}
    </p>
));

FieldsetMessage.displayName = 'FieldsetMessage';

export default FieldsetMessage;
