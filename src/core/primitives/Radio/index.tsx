import React, { useState } from 'react';

type RadioPrimitiveProps = {
    onClick: (data: any) => void;
    defaultChecked: boolean;
    name: string;
    value: string;
};

const RadioPrimitive = ({ name = '', defaultChecked = false, value = '', onClick, ...props }:RadioPrimitiveProps) => {
    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (typeof onClick === 'function') {
            onClick({
                value: event.target.value,
                checked: event.target.checked
            });
        }
    };

    return (
        <>
            <input id={value} type='radio' value={value} name={name} onClick={handleOnClick} {...props} />
        </>
    );
};

export default RadioPrimitive;
