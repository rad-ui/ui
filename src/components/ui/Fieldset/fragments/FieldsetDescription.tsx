'use client';

import React, { forwardRef } from 'react';

export type FieldsetDescriptionProps = React.ComponentPropsWithoutRef<'p'>;

const FieldsetDescription = forwardRef<HTMLParagraphElement, FieldsetDescriptionProps>(({
    children,
    ...props
}, ref) => (
    <p ref={ref} {...props} data-slot="fieldset-description">
        {children}
    </p>
));

FieldsetDescription.displayName = 'FieldsetDescription';

export default FieldsetDescription;
