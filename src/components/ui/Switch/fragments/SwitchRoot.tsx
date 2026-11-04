'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { SwitchContext } from '../context/SwitchContext';
import {
    createDataAttributes,
    composeAttributes,
    createDataAccentColorAttribute
} from '~/core/hooks/createDataAttribute';
import useControllableState from '~/core/hooks/useControllableState';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { mergeRefs } from '~/core/utils/mergeRefs';
import clsx from 'clsx';
import { useFieldControlProps, useFieldInteraction } from '~/components/ui/Field/contexts/FieldContext';
import { stateData } from '~/core/utils/stateAttributes';

const COMPONENT_NAME = 'Switch';

export type SwitchRootElement = ElementRef<typeof ButtonPrimitive>;
export type SwitchRootProps = ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    children: React.ReactNode;
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Show the state without letting the user change it. Stays focusable. */
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    asChild?: boolean;
    /** Value submitted under `name` while off. By default nothing is submitted then. */
    uncheckedValue?: string;
    /** `id` of a `<form>` elsewhere in the page that this switch submits with. */
    form?: string;
    /** Ref to the hidden `<input type="checkbox">` that mirrors the state for forms. */
    inputRef?: React.Ref<HTMLInputElement>;
};

const SwitchRoot = forwardRef<SwitchRootElement, SwitchRootProps>((fieldAwareProps, ref) => {
    const {
        children,
        customRootClass,
        color = '',
        variant,
        size,
        defaultChecked = false,
        checked,
        onCheckedChange,
        disabled = false,
        readOnly = false,
        required = false,
        name,
        value,
        asChild = false,
        className,
        onClick,
        uncheckedValue,
        form,
        inputRef,
        onFocus,
        onBlur,
        ...props
    } = useFieldControlProps(fieldAwareProps);
    const [isChecked, setIsChecked] = useControllableState(
        checked,
        defaultChecked,
        onCheckedChange
    );

    const field = useFieldInteraction(isChecked, Boolean(isChecked));
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('switch', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    const handleCheckedChange = () => {
        if (disabled || readOnly) return;
        setIsChecked(!isChecked);
    };

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const defaultCheckedRef = React.useRef(defaultChecked);
    const rendersFormInput = Boolean(name) || required;

    // Return to the initial state when the owning form resets, like a native checkbox.
    const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);
    const setHiddenInput = React.useCallback((node: HTMLInputElement | null) => {
        hiddenInputRef.current = node;
        if (typeof inputRef === 'function') inputRef(node);
        else if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }, [inputRef]);
    React.useEffect(() => {
        // The hidden input knows its form even when `form` points outside the tree.
        const owner = hiddenInputRef.current?.form ?? buttonRef.current?.closest('form');
        if (!owner || !rendersFormInput) return;
        const handleReset = () => setIsChecked(Boolean(defaultCheckedRef.current));
        owner.addEventListener('reset', handleReset);
        return () => owner.removeEventListener('reset', handleReset);
    }, [rendersFormInput, setIsChecked, form]);

    const contextValues = {
        checked: isChecked,
        setChecked: setIsChecked,
        rootClass,
        disabled
    };

    const switchAttributes: Record<string, any> = {
        ...field.stateAttributes,
        ...composedAttributes,
        'data-slot': 'switch-root',
        ...stateData(isChecked ? 'checked' : 'unchecked'),
        'data-disabled': disabled ? '' : undefined,
        role: 'switch',
        'aria-checked': isChecked,
        'aria-required': required,
        'aria-readonly': readOnly || undefined,
        'data-readonly': readOnly ? '' : undefined,
        disabled,
        ...props
    };

    // Add form attributes if provided
    if (name) switchAttributes.name = name;
    if (value) switchAttributes.value = value;

    return (
        <SwitchContext.Provider value={contextValues}>
            <ButtonPrimitive
                ref={mergeRefs(ref, buttonRef)}
                asChild={asChild}
                {...switchAttributes}
                className={clsx(rootClass, className)}
                onClick={composeEventHandlers(onClick, handleCheckedChange)}
                onFocus={composeEventHandlers(onFocus, field.onFocus)}
                onBlur={composeEventHandlers(onBlur, field.onBlur)}
            >
                {children}
            </ButtonPrimitive>
            {rendersFormInput && (
                // A button only submits its name/value when it is the submitter, so mirror the
                // state into a checkbox the form can read (FormData, required validation).
                <input
                    ref={setHiddenInput}
                    type="checkbox"
                    aria-hidden="true"
                    tabIndex={-1}
                    name={name}
                    form={form}
                    value={value ?? 'on'}
                    checked={isChecked}
                    required={required}
                    disabled={disabled}
                    onChange={() => {}}
                    style={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        margin: 0,
                        opacity: 0,
                        pointerEvents: 'none'
                    }}
                />
            )}
            {rendersFormInput && uncheckedValue !== undefined && name && !isChecked && !disabled && (
                <input type="hidden" name={name} form={form} value={uncheckedValue} />
            )}
        </SwitchContext.Provider>
    );
});

SwitchRoot.displayName = COMPONENT_NAME;

export default SwitchRoot;
