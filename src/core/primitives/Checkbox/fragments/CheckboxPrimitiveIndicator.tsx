'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import { stateData } from '~/core/utils/stateAttributes';

export type CheckboxPrimitiveIndicatorElement = ElementRef<'span'>;
export type CheckboxPrimitiveIndicatorProps = ComponentPropsWithoutRef<'span'> & {
    children: React.ReactNode;
};

const CheckboxPrimitiveIndicator = forwardRef<CheckboxPrimitiveIndicatorElement, CheckboxPrimitiveIndicatorProps>(({ children, className = '', ...props }, ref) => {
    const { isChecked, disabled } = React.useContext(CheckboxPrimitiveContext);

    const isIndeterminate = isChecked === 'indeterminate' || isChecked === null;
    if (isChecked !== true && !isIndeterminate) return null;

    return <span
        ref={ref}
        {...props}
        className={className}
        {...stateData(isIndeterminate ? 'indeterminate' : 'checked')}
        data-disabled={disabled ? '' : undefined}
    >{children}</span>;
});

CheckboxPrimitiveIndicator.displayName = 'CheckboxPrimitiveIndicator';

export default CheckboxPrimitiveIndicator;
