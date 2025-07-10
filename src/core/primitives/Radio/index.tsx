import React from 'react';
import Primitive from '../Primitive';

type RadioPrimitiveProps = {
    name: string;
    value: string;
    id: string;
    onChange?: () => void;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
    asChild?: boolean
}

function RadioPrimitive({ name, value, id, checked, required, onChange, disabled, asChild, ...props }: RadioPrimitiveProps) {
    return (
        <Primitive.input
            type="radio"
            checked={checked}
            name={name}
            tabIndex={-1}
            value={value}
            onChange={onChange}
            id={value}
            aria-disabled={disabled}
            disabled={disabled}
            required={required}
            aria-required={required}
            asChild={asChild}
            {...props}
        />
    );
}

export default RadioPrimitive;
