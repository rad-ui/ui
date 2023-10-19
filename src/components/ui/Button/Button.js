import React from 'react';
// make the color prop default accent color
const Button = ({children, type="button", color="tomato", className="", isDark=false, variant="solid",...props}) => {

    // apply data attribute for accent color

    return (
        <button
            type="button"
            className={`rad-ui-button button-${variant} ${className}`}
            data-accent-color={color}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
