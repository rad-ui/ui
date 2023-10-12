import React from 'react';

const Button = ({children, type="button",className="", isDark=false, variant="primary",...props}) => {
    if(variant==="primary"){
        variant = "accent"
    }
    return (
        <button
            type="button"
            className={`button-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
