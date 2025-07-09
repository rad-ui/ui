import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

export type RadioPrimitiveProps = {
    onClick?: (data: any) => void;
    onChange?: (data: any) => void;
    onFocus?: (data: any) => void;
    checked?: boolean;
    name: string;
    value: string;
    disabled?: boolean
    asChild?: boolean
    required?: boolean
};

const RadioPrimitive = ({ name = '', value = '', checked = false, onClick, onChange, onFocus, disabled = false, asChild = false, required = false, ...props }:RadioPrimitiveProps) => {
    const [isChecked, setIsChecked] = useState(checked);
    const dataAttributes = {
        'data-checked': isChecked.toString()
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        console.log(isChecked);
        if (typeof onChange === 'function') {
            setIsChecked(isChecked);
            onChange({
                value,
                checked: isChecked
            });
        }
    };

    return (
        <Primitive.input id={value} type='radio' value={value} name={name} onFocus={onFocus} onChange={handleOnChange} disabled={disabled} asChild={asChild} required={required} {...props} {...dataAttributes}/>
    );
};

export default RadioPrimitive;
