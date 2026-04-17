'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useRef, useEffect } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import CheckboxPrimitiveTrigger from './CheckboxPrimitiveTrigger';
import useControllableState from '~/core/hooks/useControllableState';

export type CheckboxPrimitiveRootElement = ElementRef<typeof CheckboxPrimitiveTrigger>;
export type CheckboxPrimitiveRootProps = {
    children: React.ReactNode;
    checked?: boolean | 'indeterminate' | null;
    defaultChecked?: boolean | 'indeterminate' | null;
    onCheckedChange?: (value: boolean | 'indeterminate' | null) => void;
    name?: string;
    value?: string;
    id?: string;
} & ComponentPropsWithoutRef<typeof CheckboxPrimitiveTrigger>;

const CheckboxPrimitiveRoot = forwardRef<CheckboxPrimitiveRootElement, CheckboxPrimitiveRootProps>(
    ({ children, className = '', checked, defaultChecked = false, onCheckedChange, disabled, required, name, value, id, ...props }, ref) => {
        const [isChecked, setIsChecked] = useControllableState<boolean | 'indeterminate' | null>(
            checked,
            defaultChecked,
            onCheckedChange
        );

        const inputRef = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.indeterminate = isChecked === 'indeterminate' || isChecked === null;
            }
        }, [isChecked]);

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
                ref={inputRef}
                type="checkbox"
                id={id}
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: 0,
                    margin: 0,
                    transform: 'translateX(-100%)'
                }} name={name} value={value} checked={isChecked === true} disabled={disabled} required={required} readOnly />
        </CheckboxPrimitiveContext.Provider>;
    }
);

CheckboxPrimitiveRoot.displayName = 'CheckboxPrimitiveRoot';

export default CheckboxPrimitiveRoot;
