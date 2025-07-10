import React from 'react';
import Primitive from '../Primitive';

export type RadioPrimitiveProps = {
    name: string;
    value: string;
    id: string;
    onChange?: () => void;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
    asChild?: boolean;
    className?: string;
}

function RadioPrimitive({ name, value, id, checked, required, onChange, disabled, asChild, className, ...props }: RadioPrimitiveProps) {
    return (
        <Primitive.input
            type="radio"
            checked={checked}
            name={name}
            tabIndex={-1}
            value={value}
            onChange={onChange}
            id={id}
            aria-disabled={disabled}
            disabled={disabled}
            required={required}
            aria-required={required}
            asChild={asChild}
            className={className}
            {...props}
        />
    );
}

export default RadioPrimitive;
