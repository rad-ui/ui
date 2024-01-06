'use client';
import React, { RefObject, useRef } from 'react';
// make the color prop default accent color

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    color?: string;
    className?: string;
    variant?: 'solid' | "outline" | "soft" | "ghost";
    props?: Record<any, any>[]
    buttonRef?: RefObject<HTMLButtonElement>
}

const Button = ({children, type='button', color = "", className='', variant='solid', buttonRef, ...props }: ButtonProps) => {
    const refButton = useRef<HTMLButtonElement>()
    // apply data attribute for accent color
    // apply attribute only if color is present

    return (
        <button
            type="button"
            ref={buttonRef}
            className={`rad-ui-button button-${variant} ${className}`} data-accent-color={color ?? undefined}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
