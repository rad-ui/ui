'use client';
import React from 'react';
import RadioPrimitive, { RadioPrimitiveProps } from '~/core/primitives/Radio';

import clsx from 'clsx';
import { customClassSwitcher } from '~/core';

import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Radio';

export type RadioProps = RadioPrimitiveProps & {
    customRootClass?: string;
    className?: string;
    size?: string;
    color?: string;
    variant?: string;
};

function Radio({ name, value, id, checked = false, required, onChange, disabled, asChild, className, customRootClass, variant = '', size = '', color = '', ...props }: RadioProps) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isChecked, setIsChecked] = React.useState(checked);

    const dataAttributes = useCreateDataAttribute('button', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    const handleChange = () => {
        if (onChange) {
            onChange();
        }
        setIsChecked(!isChecked);
    };
    return (
        <RadioPrimitive
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
            {...composedAttributes()}
            {...props}
        />

    );
}

export default Radio;
