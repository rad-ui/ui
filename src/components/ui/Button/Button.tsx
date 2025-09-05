'use client';
import React, {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef,
} from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import {
    useCreateDataAttribute,
    useComposeAttributes,
    useCreateDataAccentColorAttribute,
} from '~/core/hooks/createDataAttribute';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';

type ButtonPrimitiveRef = ElementRef<typeof ButtonPrimitive>;
type ButtonPrimitiveProps = ComponentPropsWithoutRef<typeof ButtonPrimitive>;

export interface ButtonProps extends ButtonPrimitiveProps {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
    children?: React.ReactNode;
}

const Button = forwardRef<ButtonPrimitiveRef, ButtonProps>(({
    children,
    type = 'button',
    customRootClass = '',
    className = '',
    variant = '',
    size = '',
    color = '',
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    // apply data attribute for accent color
    // apply attribute only if color is present
    const dataAttributes = useCreateDataAttribute('button', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <ButtonPrimitive
            ref={ref}
            type={type}
            className={clsx(rootClass, className)}
            {...composedAttributes()}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

Button.displayName = COMPONENT_NAME;

export default Button;
