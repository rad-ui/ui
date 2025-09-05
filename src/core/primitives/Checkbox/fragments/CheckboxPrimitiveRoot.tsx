'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import CheckboxPrimitiveTrigger from './CheckboxPrimitiveTrigger';
import useControllableState from '~/core/hooks/useControllableState';

export type CheckboxPrimitiveRootElement = ElementRef<typeof CheckboxPrimitiveTrigger>;
export type CheckboxPrimitiveRootProps = {
    children: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: () => void;
    name?: string;
    value?: string;
    id?: string;
} & ComponentPropsWithoutRef<typeof CheckboxPrimitiveTrigger>;

const CheckboxPrimitiveRoot = forwardRef<CheckboxPrimitiveRootElement, CheckboxPrimitiveRootProps>(({ children, className = '', checked, defaultChecked = false, onCheckedChange, disabled, required, name, value, id, ...props }, ref) => {
    const [isChecked, setIsChecked] = useControllableState(
        checked,
        defaultChecked,
        onCheckedChange
    );

    const contextValues = {
        isChecked,
        setIsChecked,
        id,
        required,
        disabled
    };

    return <CheckboxPrimitiveContext.Provider value={contextValues}>
        <CheckboxPrimitiveTrigger ref={ref} className={className} disabled={disabled} required={required} {...props}>
            {children}
        </CheckboxPrimitiveTrigger>
        <input
            type="checkbox" style={{
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0,
                margin: 0,
                transform: 'translateX(-100%)'
            }} name={name} value={value} checked={isChecked} disabled={disabled} required={required} readOnly />
    </CheckboxPrimitiveContext.Provider>;
});

CheckboxPrimitiveRoot.displayName = 'CheckboxPrimitiveRoot';

export default CheckboxPrimitiveRoot;
