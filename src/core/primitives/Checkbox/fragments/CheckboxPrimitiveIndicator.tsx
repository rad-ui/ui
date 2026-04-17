'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

export type CheckboxPrimitiveIndicatorElement = ElementRef<'span'>;
export type CheckboxPrimitiveIndicatorProps = ComponentPropsWithoutRef<'span'> & {
    children: React.ReactNode;
};

const CheckboxPrimitiveIndicator = forwardRef<CheckboxPrimitiveIndicatorElement, CheckboxPrimitiveIndicatorProps>(({ children, className = '', ...props }, ref) => {
    const { isChecked } = React.useContext(CheckboxPrimitiveContext);

    if (isChecked !== true) return null;

    return <span ref={ref} className={className} {...props}>{children}</span>;
});

CheckboxPrimitiveIndicator.displayName = 'CheckboxPrimitiveIndicator';

export default CheckboxPrimitiveIndicator;
