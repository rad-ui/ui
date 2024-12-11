import React from 'react';

const RadioPrimitive = ({ role = 'radio', label = '', id, value, defaultChecked, onChange, checked, children, ...props }:any) => {
    const ariaProps = {
        'aria-label': label || undefined,
        'aria-checked': checked ? 'true' : 'false',
        'data-checked': checked ? 'true' : 'false'
    };

    return (
        <div>
            <input type='radio' id={id} {...ariaProps} {...props} value={value} checked={defaultChecked} onChange={onChange} />
            <label htmlFor={id}> {children}</label>
        </div>
    );
};

export default RadioPrimitive;
