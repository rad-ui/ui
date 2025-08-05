'use client';

import React from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { customClassSwitcher } from '~/core';
import { SwitchContext } from '../context/SwitchContext';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Switch';

export type SwitchRootProps = {
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

const SwitchRoot = ({
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
    ...props
}: SwitchRootProps) => {
    const [isChecked, setIsChecked] = useControllableState(
        checked,
        defaultChecked,
        onCheckedChange
    );

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('switch', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    const handleCheckedChange = () => {
        if (disabled) return;
        setIsChecked(!isChecked);
    };

    const contextValues = {
        checked: isChecked,
        setChecked: setIsChecked,
        rootClass,
        disabled
    };

    const switchAttributes: Record<string, any> = {
        ...composedAttributes(),
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
                onClick={handleCheckedChange}
                className={rootClass}
                asChild={asChild}
                {...switchAttributes}
            >
                {children}
            </ButtonPrimitive>
        </SwitchContext.Provider>
    );
};

export default SwitchRoot;
