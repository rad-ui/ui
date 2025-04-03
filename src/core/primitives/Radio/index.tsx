import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

export type RadioPrimitiveProps = {
    onClick?: (data: any) => void;
    onChange?: (data: any) => void;
    checked?: boolean;
    name: string;
    value: string;
};

const RadioPrimitive = ({ name = '', value = '', checked = false, onClick, onChange, ...props }:RadioPrimitiveProps) => {
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
        <Primitive.input id={value} type='radio' value={value} name={name} onChange={handleOnChange} {...props} {...dataAttributes}/>
    );
};

export default RadioPrimitive;
