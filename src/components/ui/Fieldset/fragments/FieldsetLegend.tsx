'use client';

import React, { forwardRef } from 'react';

export type FieldsetLegendProps = React.ComponentPropsWithoutRef<'legend'>;

const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>(({
    children,
    ...props
}, ref) => (
    <legend ref={ref} {...props} data-slot="fieldset-legend">
        {children}
    </legend>
));

FieldsetLegend.displayName = 'FieldsetLegend';

export default FieldsetLegend;
