'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type CheckboxPrimitiveTriggerElement = ElementRef<typeof ButtonPrimitive>;
export type CheckboxPrimitiveTriggerProps = ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const CheckboxPrimitiveTrigger = forwardRef<CheckboxPrimitiveTriggerElement, CheckboxPrimitiveTriggerProps>(
    ({ children, className = '', onClick, ...props }, ref) => {
        const { isChecked, setIsChecked, id, required, disabled } = React.useContext(CheckboxPrimitiveContext);
        const toggleChecked = () => {
            const next = isChecked === 'indeterminate' || isChecked === null ? true : !isChecked;
            setIsChecked(next);
        };
        const dataState = isChecked === 'indeterminate' || isChecked === null
            ? 'indeterminate'
            : isChecked ? 'checked' : 'unchecked';
        const ariaChecked: boolean | 'mixed' =
            isChecked === 'indeterminate' || isChecked === null ? 'mixed' : isChecked;
        return <ButtonPrimitive
            ref={ref}
            {...props}
            onClick={composeEventHandlers(onClick, toggleChecked)}
            role="checkbox"
            id={id}
            aria-checked={ariaChecked}
            aria-required={required}
            data-checked={isChecked as any}
            data-state={dataState}
            disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            className={className}
        >{children}</ButtonPrimitive>;
    }
);

CheckboxPrimitiveTrigger.displayName = 'CheckboxPrimitiveTrigger';

export default CheckboxPrimitiveTrigger;
