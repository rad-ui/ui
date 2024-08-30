'use client';
import React, {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from 'react';
import {customClassSwitcher} from '~/core';

import ButtonPrimitive from '~/core/primitives/Button';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';


export type ButtonProps = {
    customRootClass?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'ghost';
    size?: 'small' | 'medium' | 'large' | 'x-large';
    buttonRef: React.LegacyRef<HTMLButtonElement> | undefined
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PropsWithChildren

const Button = ({children, type='button', customRootClass='', className='', color, variant='solid', size='medium', buttonRef, ...props}: ButtonProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    // apply data attribute for accent color
    // apply attribute only if color is present

    return (
        <ButtonPrimitive
            buttonRef={buttonRef}
            type={type}
            className={`${rootClass} button-${variant} ${className} `} data-accent-color={color ?? undefined} data-size={size}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

Button.displayName = COMPONENT_NAME;

export default Button;
