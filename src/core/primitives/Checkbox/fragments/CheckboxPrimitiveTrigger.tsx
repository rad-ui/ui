'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

export type CheckboxPrimitiveTriggerElement = ElementRef<typeof ButtonPrimitive>;
export type CheckboxPrimitiveTriggerProps = ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const CheckboxPrimitiveTrigger = forwardRef<CheckboxPrimitiveTriggerElement, CheckboxPrimitiveTriggerProps>(({ children, className = '', ...props }, ref) => {
    const { isChecked, setIsChecked, id, required, disabled } = React.useContext(CheckboxPrimitiveContext);
    return <ButtonPrimitive ref={ref} onClick={() => setIsChecked(!isChecked)} role="checkbox" id={id} aria-checked={isChecked} aria-required={required} data-checked={isChecked} disabled={disabled} data-disabled={disabled} className={className} {...props}>{children}</ButtonPrimitive>;
});

CheckboxPrimitiveTrigger.displayName = 'CheckboxPrimitiveTrigger';

export default CheckboxPrimitiveTrigger;
