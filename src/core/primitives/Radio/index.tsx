import React from 'react';
import Primitive from '~/core/primitives/Primitive';

type RadioPrimitiveProps = {
    onClick: (data: any) => void;
    onChange: (data: any) => void;
    checked: boolean;
    name: string;
    value: string;
};

const RadioPrimitive = ({ name = '', value = '', checked = false, onClick, onChange, ...props }:RadioPrimitiveProps) => {
    const dataAttributes = {
        'data-checked': checked.toString()
    };

    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const isChecked = event.target?.checked;
        if (typeof onClick === 'function') {
            onClick({
                value,
                checked: isChecked
            });
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        if (typeof onChange === 'function') {
            onChange({
                value,
                checked: isChecked
            });
        }
    };

    return (
        <Primitive.input id={value} type='radio' value={value} name={name} onClick={handleOnClick} onChange={handleOnChange} {...props} {...dataAttributes}/>
    );
};

export default RadioPrimitive;
