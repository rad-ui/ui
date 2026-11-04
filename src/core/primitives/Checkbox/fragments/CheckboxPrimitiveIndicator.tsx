'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import { stateData } from '~/core/utils/stateAttributes';

export type CheckboxPrimitiveIndicatorElement = ElementRef<'span'>;
export type CheckboxPrimitiveIndicatorProps = ComponentPropsWithoutRef<'span'> & {
    children: React.ReactNode;
    /** Keep it rendered while unchecked (with `data-state="unchecked"`), for exit animations or reserved space. */
    forceMount?: boolean;
};

const CheckboxPrimitiveIndicator = forwardRef<CheckboxPrimitiveIndicatorElement, CheckboxPrimitiveIndicatorProps>(({ children, className = '', forceMount = false, ...props }, ref) => {
    const { isChecked, disabled } = React.useContext(CheckboxPrimitiveContext);

    const isIndeterminate = isChecked === 'indeterminate' || isChecked === null;
    const checked = isChecked === true;
    if (!checked && !isIndeterminate && !forceMount) return null;

    return <span
        ref={ref}
        {...props}
        className={className}
        {...stateData(isIndeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked')}
        data-disabled={disabled ? '' : undefined}
    >{children}</span>;
});

CheckboxPrimitiveIndicator.displayName = 'CheckboxPrimitiveIndicator';

export default CheckboxPrimitiveIndicator;
