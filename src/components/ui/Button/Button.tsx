'use client';
import React, {RefObject} from 'react';
// make the color prop default accent color

export type ButtonProps = {
    children?: React.ReactNode;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'ghost';
    props?: Record<any, any>[]
    buttonRef?: RefObject<HTMLButtonElement>
}

const Button = ({children, type='button', color = '', className='', variant='solid', buttonRef, ...props}: ButtonProps) => {
    // apply data attribute for accent color
    // apply attribute only if color is present

    return (
        <button
            type="button"
            className={`rad-ui-button button-${variant} ${className}`} data-accent-color={color ?? undefined}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
