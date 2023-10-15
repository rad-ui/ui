import React from 'react';

const Button = ({children, type="button",className="", isDark=false, variant="solid",...props}) => {

    return (
        <button
            type="button"
            className={`rad-ui-button button-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
