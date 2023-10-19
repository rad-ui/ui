import React from 'react';
// make the color prop default accent color
const Button = ({children, type="button", color=undefined, className="", isDark=false, variant="solid",...props}) => {

    // apply data attribute for accent color
    // apply attribute only if color is present
    if(color){
        props["data-accent-color"] = color
    }

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
