'use client';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';

export type ButtonProps = {
    customRootClass?: string;
    variant?: string;
    color?: string;
    size?:string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PropsWithChildren

const Button = ({ children, type = 'button', customRootClass = '', className = '', variant = '', size = '', color = '', ...props }: ButtonProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    // apply data attribute for accent color
    // apply attribute only if color is present
    const data_attributes: Record<string, string> = {};

    if (variant) {
        data_attributes['data-button-variant'] = variant;
    }

    if (size) {
        data_attributes['data-button-size'] = size;
    }

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return (
        <ButtonPrimitive
            type={type}
            className={clsx(rootClass, className)}
            {...data_attributes}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

Button.displayName = COMPONENT_NAME;

export default Button;
