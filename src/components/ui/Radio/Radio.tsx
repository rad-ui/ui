'use client';
import React from 'react';
import RadioPrimitive, { RadioPrimitiveProps } from '~/core/primitives/Radio';

import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Radio';

export type RadioElement = React.ElementRef<typeof RadioPrimitive>;

export type RadioProps = Omit<RadioPrimitiveProps, 'size'> & {
    customRootClass?: string;
    className?: string;
    size?: string;
    color?: string;
    variant?: string;
};

const Radio = React.forwardRef<RadioElement, RadioProps>(function Radio(
    { name, value, id, checked, required, onChange, disabled, asChild, className, customRootClass, variant = '', size = '', color = '', ...props },
    ref
) {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [isChecked, setIsChecked] = useControllableState(checked, false, () => {
        onChange?.();
    });

    const dataAttributes = createDataAttributes('button', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes, {
        'data-slot': 'radio-root',
        'data-state': isChecked ? 'checked' : 'unchecked',
        'data-disabled': disabled ? '' : undefined
    });

    const handleChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <RadioPrimitive
            ref={ref}
            name={name}
            id={id}
            value={value}
            checked={isChecked}
            required={required}
            onChange={handleChange}
            disabled={disabled}
            asChild={asChild}
            className={clsx(rootClass, className)}
            {...props}
            data-checked={isChecked}
            {...composedAttributes}
        />

    );
});

Radio.displayName = COMPONENT_NAME;

export default Radio;
