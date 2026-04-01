'use client';
import React from 'react';
import RadioPrimitive, { RadioPrimitiveProps } from '~/core/primitives/Radio';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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
    { name, value, id, checked = false, required, onChange, disabled, asChild, className, customRootClass, variant = '', size = '', color = '', ...props },
    ref
) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isChecked, setIsChecked] = React.useState(checked);

    const dataAttributes = createDataAttributes('button', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    const handleChange = () => {
        if (onChange) {
            onChange();
        }
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
            data-checked={isChecked}
            {...composedAttributes}
            {...props}
        />

    );
});

Radio.displayName = COMPONENT_NAME;

export default Radio;
