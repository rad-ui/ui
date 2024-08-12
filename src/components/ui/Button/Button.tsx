'use client';
import React from 'react';
import {customClassSwitcher} from '~/core';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';


export type ButtonProps = {
    children?: React.ReactNode;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    customRootClass?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'ghost';
    size?: 'small' | 'medium' | 'large' | 'x-large';
    props?: any
}

const Button = ({children, type='button', customRootClass='', color = '', className='', variant='solid', size='', ...props}: ButtonProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    // apply data attribute for accent color
    // apply attribute only if color is present

    return (
        <button
            type={type}
            className={`${rootClass} button-${variant} ${className} `} data-accent-color={color ?? undefined} data-size={size}
            {...props}
        >
            {children}
        </button>
    );
};

Button.displayName = COMPONENT_NAME;

export default Button;
