'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import FieldsetContext from '../contexts/FieldsetContext';

export type FieldsetLegendProps = React.ComponentPropsWithoutRef<'legend'>;

const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>(({
    children,
    className,
    ...props
}, ref) => {
    const { rootClass } = useContext(FieldsetContext);

    return (
        <legend ref={ref} className={clsx(rootClass && `${rootClass}-legend`, className)} {...props} data-slot="fieldset-legend">
            {children}
        </legend>
    );
});

FieldsetLegend.displayName = 'FieldsetLegend';

export default FieldsetLegend;
