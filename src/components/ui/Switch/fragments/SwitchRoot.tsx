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
    required?: boolean;
    name?: string;
    value?: string;
    asChild?: boolean;
};

const SwitchRoot = forwardRef<SwitchRootElement, SwitchRootProps>(({
    children,
    customRootClass,
    color = '',
    variant,
    size,
    defaultChecked = false,
    checked,
    onCheckedChange,
    disabled = false,
    required = false,
    name,
    value,
    asChild = false,
    className,
    onClick,
    ...props
}, ref) => {
    const [isChecked, setIsChecked] = useControllableState(
        checked,
        defaultChecked,
        onCheckedChange
    );

    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('switch', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    const handleCheckedChange = () => {
        if (disabled) return;
        setIsChecked(!isChecked);
    };

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const defaultCheckedRef = React.useRef(defaultChecked);
    const rendersFormInput = Boolean(name) || required;

    // Return to the initial state when the owning form resets, like a native checkbox.
    React.useEffect(() => {
        const form = buttonRef.current?.closest('form');
        if (!form || !rendersFormInput) return;
        const handleReset = () => setIsChecked(Boolean(defaultCheckedRef.current));
        form.addEventListener('reset', handleReset);
        return () => form.removeEventListener('reset', handleReset);
    }, [rendersFormInput, setIsChecked]);

    const contextValues = {
        checked: isChecked,
        setChecked: setIsChecked,
        rootClass,
        disabled
    };

    const switchAttributes: Record<string, any> = {
        ...composedAttributes,
        'data-slot': 'switch-root',
        'data-state': isChecked ? 'checked' : 'unchecked',
        'data-disabled': disabled ? '' : undefined,
        role: 'switch',
        'aria-checked': isChecked,
        'aria-required': required,
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
            >
                {children}
            </ButtonPrimitive>
            {rendersFormInput && (
                // A button only submits its name/value when it is the submitter, so mirror the
                // state into a checkbox the form can read (FormData, required validation).
                <input
                    type="checkbox"
                    aria-hidden="true"
                    tabIndex={-1}
                    name={name}
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
        </SwitchContext.Provider>
    );
});

SwitchRoot.displayName = COMPONENT_NAME;

export default SwitchRoot;
