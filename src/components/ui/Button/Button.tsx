'use client';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import  { createDataAttribute, composeAttributes }  from "~/core/hooks/createDataAttribute"

// make the color prop default accent color
const COMPONENT_NAME = 'Button';

export type ButtonProps = {
    customRootClass?: string;
    variant?: string;
    size?:string;
    color?:string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PropsWithChildren

const Button = ({ children, type = 'button', customRootClass = '', className = '', variant = '', size = '', color = '', ...props }: ButtonProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    // apply data attribute for accent color
    // apply attribute only if color is present
    const dataAttributes = createDataAttribute("button", { variant, size });
    const accentAttributes = createDataAttribute("accent", { color });
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

    return (
        <ButtonPrimitive
            type={type}
            className={clsx(rootClass, className)}
            {...composedAttributes}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};

Button.displayName = COMPONENT_NAME;

export default Button;
