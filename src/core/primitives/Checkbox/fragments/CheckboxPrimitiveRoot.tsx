'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useRef, useEffect } from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import CheckboxPrimitiveTrigger from './CheckboxPrimitiveTrigger';
import useControllableState from '~/core/hooks/useControllableState';

export type CheckboxPrimitiveRootElement = ElementRef<typeof CheckboxPrimitiveTrigger>;
export type CheckboxPrimitiveRootProps = {
    children?: React.ReactNode;
    checked?: boolean | 'indeterminate' | null;
    defaultChecked?: boolean | 'indeterminate' | null;
    onCheckedChange?: (value: boolean | 'indeterminate' | null) => void;
    name?: string;
    value?: string;
    id?: string;
    /** Show the state without letting the user change it. Stays focusable and is submitted with the form. */
    readOnly?: boolean;
    /** Show the mixed state regardless of `checked` (for a "select all" over a partial selection). */
    indeterminate?: boolean;
    /** Value submitted under `name` while unchecked. By default nothing is submitted then. */
    uncheckedValue?: string;
    /** `id` of a `<form>` elsewhere in the page that this checkbox submits with. */
    form?: string;
    /** Ref to the hidden `<input type="checkbox">` that mirrors the state for forms. */
    inputRef?: React.Ref<HTMLInputElement>;
} & Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitiveTrigger>, 'checked' | 'defaultChecked'>;

const CheckboxPrimitiveRoot = forwardRef<CheckboxPrimitiveRootElement, CheckboxPrimitiveRootProps>(
    ({ children, className = '', checked, defaultChecked = false, onCheckedChange, disabled, required, name, value, id, readOnly, indeterminate = false, uncheckedValue, form, inputRef: inputRefProp, ...props }, ref) => {
        const [checkedState, setIsChecked] = useControllableState<boolean | 'indeterminate' | null>(
            checked,
            defaultChecked,
            onCheckedChange
        );
        const isChecked = indeterminate ? 'indeterminate' : checkedState;

        const inputRef = useRef<HTMLInputElement | null>(null);
        const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
            inputRef.current = node;
            if (typeof inputRefProp === 'function') inputRefProp(node);
            else if (inputRefProp) (inputRefProp as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [inputRefProp]);
        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.indeterminate = isChecked === 'indeterminate' || isChecked === null;
            }
        }, [isChecked]);

        // Return to the initial state when the owning form resets, like a native checkbox.
        const defaultCheckedRef = useRef(defaultChecked);
        useEffect(() => {
            const owner = inputRef.current?.form;
            if (!owner) return;
            const handleReset = () => setIsChecked(defaultCheckedRef.current);
            owner.addEventListener('reset', handleReset);
            return () => owner.removeEventListener('reset', handleReset);
        }, [setIsChecked, form]);

        const contextValues = {
            isChecked,
            setIsChecked,
            id,
            required,
            disabled,
            readOnly
        };

        return <CheckboxPrimitiveContext.Provider value={contextValues}>
            <CheckboxPrimitiveTrigger ref={ref} className={className} disabled={disabled} required={required} {...props}>
                {children}
            </CheckboxPrimitiveTrigger>
            {/* Form mirror only: the button above is the focusable, labelled control, so this
                input stays out of the tab order and the accessibility tree and has no id. */}
            <input
                ref={setInputRef}
                type="checkbox"
                aria-hidden="true"
                tabIndex={-1}
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: 0,
                    margin: 0,
                    transform: 'translateX(-100%)'
                }} name={name} form={form} value={value ?? 'on'} checked={isChecked === true} disabled={disabled} required={required} onChange={() => {}} />
            {uncheckedValue !== undefined && name && isChecked !== true && !disabled && (
                <input type="hidden" name={name} form={form} value={uncheckedValue} />
            )}
        </CheckboxPrimitiveContext.Provider>;
    }
);

CheckboxPrimitiveRoot.displayName = 'CheckboxPrimitiveRoot';

export default CheckboxPrimitiveRoot;
