'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

export type CheckboxPrimitiveIndicatorElement = ElementRef<'span'>;
export type CheckboxPrimitiveIndicatorProps = ComponentPropsWithoutRef<'span'> & {
    children: React.ReactNode;
};

const CheckboxPrimitiveIndicator = forwardRef<CheckboxPrimitiveIndicatorElement, CheckboxPrimitiveIndicatorProps>(({ children, className = '', ...props }, ref) => {
    const { isChecked, disabled } = React.useContext(CheckboxPrimitiveContext);

    if (isChecked !== true) return null;

    return <span
        ref={ref}
        {...props}
        className={className}
        data-state="checked"
        data-disabled={disabled ? '' : undefined}
    >{children}</span>;
});

CheckboxPrimitiveIndicator.displayName = 'CheckboxPrimitiveIndicator';

export default CheckboxPrimitiveIndicator;
