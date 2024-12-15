import React from 'react';

const TextFieldInput = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <input className={`${className}`} {...props} />;
};

export default TextFieldInput;
