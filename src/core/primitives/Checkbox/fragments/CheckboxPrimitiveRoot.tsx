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
} & Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitiveTrigger>, 'checked' | 'defaultChecked'>;

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

        // Return to the initial state when the owning form resets, like a native checkbox.
        const defaultCheckedRef = useRef(defaultChecked);
        useEffect(() => {
            const form = inputRef.current?.form;
            if (!form) return;
            const handleReset = () => setIsChecked(defaultCheckedRef.current);
            form.addEventListener('reset', handleReset);
            return () => form.removeEventListener('reset', handleReset);
        }, [setIsChecked]);

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
            {/* Form mirror only: the button above is the focusable, labelled control, so this
                input stays out of the tab order and the accessibility tree and has no id. */}
            <input
                ref={inputRef}
                type="checkbox"
                aria-hidden="true"
                tabIndex={-1}
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: 0,
                    margin: 0,
                    transform: 'translateX(-100%)'
                }} name={name} value={value ?? 'on'} checked={isChecked === true} disabled={disabled} required={required} onChange={() => {}} />
        </CheckboxPrimitiveContext.Provider>;
    }
);

CheckboxPrimitiveRoot.displayName = 'CheckboxPrimitiveRoot';

export default CheckboxPrimitiveRoot;
