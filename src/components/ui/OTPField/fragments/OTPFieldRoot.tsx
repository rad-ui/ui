'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { useControllableState } from '~/core/hooks/useControllableState';
import OTPFieldContext, { OTPFieldValidationType } from '../contexts/OTPFieldContext';

const COMPONENT_NAME = 'OtpField';

const PATTERNS: Record<OTPFieldValidationType, RegExp | null> = {
    numeric: /[0-9]/,
    alpha: /[a-zA-Z]/,
    alphanumeric: /[a-zA-Z0-9]/,
    none: null
};

export type OTPFieldRootElement = ElementRef<typeof Primitive.div>;
export type OTPFieldRootProps = {
    /** Controlled code. */
    value?: string;
    /** Initial code when uncontrolled. */
    defaultValue?: string;
    /** Called with the code whenever it changes. */
    onValueChange?: (value: string) => void;
    /** Number of characters. Defaults to 6. */
    length?: number;
    /** Characters each slot accepts. Defaults to `numeric`. */
    validationType?: OTPFieldValidationType;
    /** `password` masks the characters. */
    type?: 'text' | 'password';
    /** Submits the surrounding form once every slot is filled. */
    autoSubmit?: boolean;
    /** Called with the full code once every slot is filled. */
    onValueComplete?: (value: string) => void;
    /** Form field name; the code is submitted through a hidden input. */
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    /** Overrides the generated root class. */
    customRootClass?: string;
} & Omit<ComponentPropsWithoutRef<typeof Primitive.div>, 'defaultValue' | 'onChange'>;

const OTPFieldRoot = forwardRef<OTPFieldRootElement, OTPFieldRootProps>(({
    children,
    className,
    customRootClass = '',
    value: valueProp,
    defaultValue = '',
    onValueChange,
    length = 6,
    validationType = 'numeric',
    type = 'text',
    autoSubmit = false,
    onValueComplete,
    name,
    disabled = false,
    readOnly = false,
    required = false,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [value, setValue] = useControllableState<string>(valueProp, defaultValue, onValueChange);
    const valueRef = React.useRef(value);
    valueRef.current = value;
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);

    const inputsRef = React.useRef<HTMLInputElement[]>([]);
    const registerInput = React.useCallback((element: HTMLInputElement) => {
        const inputs = inputsRef.current;
        inputs.push(element);
        inputs.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        return () => {
            inputsRef.current = inputsRef.current.filter((input) => input !== element);
        };
    }, []);
    const indexOf = React.useCallback((element: HTMLInputElement | null) => (element ? inputsRef.current.indexOf(element) : -1), []);
    const focusSlot = React.useCallback((index: number) => {
        const inputs = inputsRef.current;
        const target = inputs[Math.max(0, Math.min(index, inputs.length - 1))];
        target?.focus();
        target?.select();
    }, []);

    const sanitize = React.useCallback((text: string) => {
        const pattern = PATTERNS[validationType];
        return Array.from(text).filter((char) => (pattern ? pattern.test(char) : char.trim() !== '')).join('');
    }, [validationType]);

    const commit = React.useCallback((next: string) => {
        if (next === valueRef.current) return;
        valueRef.current = next;
        setValue(next);
        if (next.length === length) {
            onValueComplete?.(next);
            if (autoSubmit) {
                // Let the hidden input pick up the new value before submitting.
                requestAnimationFrame(() => hiddenInputRef.current?.form?.requestSubmit());
            }
        }
    }, [setValue, length, onValueComplete, autoSubmit]);

    const insertAt = React.useCallback((index: number, text: string) => {
        if (disabled || readOnly) return;
        const chars = sanitize(text);
        if (!chars) return;
        const current = valueRef.current;
        // Slots fill left to right, so never leave a gap before `index`.
        const start = Math.min(index, current.length);
        const next = (current.slice(0, start) + chars + current.slice(start + chars.length)).slice(0, length);
        commit(next);
        focusSlot(Math.min(start + chars.length, length - 1));
    }, [disabled, readOnly, sanitize, length, commit, focusSlot]);

    const removeAt = React.useCallback((index: number) => {
        if (disabled || readOnly) return;
        const current = valueRef.current;
        if (index < 0 || index >= current.length) return;
        commit(current.slice(0, index) + current.slice(index + 1));
    }, [disabled, readOnly, commit]);

    const contextValue = React.useMemo(() => ({
        rootClass,
        value,
        valueRef,
        length,
        validationType,
        type,
        disabled,
        readOnly,
        registerInput,
        indexOf,
        focusSlot,
        insertAt,
        removeAt
    }), [rootClass, value, length, validationType, type, disabled, readOnly, registerInput, indexOf, focusSlot, insertAt, removeAt]);

    const complete = value.length === length;

    return (
        <OTPFieldContext.Provider value={contextValue}>
            <Primitive.div
                ref={ref}
                role="group"
                className={clsx(rootClass, className)}
                {...props}
                data-slot="otp-field-root"
                data-complete={complete ? '' : undefined}
                data-disabled={disabled ? '' : undefined}
            >
                {children}
                <input
                    ref={hiddenInputRef}
                    type="hidden"
                    name={name}
                    value={value}
                    disabled={disabled}
                    required={required}
                    data-slot="otp-field-hidden-input"
                />
            </Primitive.div>
        </OTPFieldContext.Provider>
    );
});

OTPFieldRoot.displayName = 'OTPField';

export default OTPFieldRoot;
