'use client';
import React, {
    forwardRef,
    ComponentPropsWithoutRef,
    ElementRef
} from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';

export type ButtonProps = {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
} & ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const Button = forwardRef<ElementRef<typeof ButtonPrimitive>, ButtonProps>(
    ({
        children,
        type = 'button',
        customRootClass = '',
        className = '',
        variant = '',
        size = '',
        color = '',
        disabled = false,
        onClick,
        ...props
    }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        // apply data attribute for accent color
        // apply attribute only if color is present
        const dataAttributes = useCreateDataAttribute('button', { variant, size });
        const accentAttributes = useCreateDataAccentColorAttribute(color);
        const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

        const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            onClick?.(event);
        };

        return (
            <ButtonPrimitive
                ref={ref}
                type={type}
                disabled={disabled}
                data-disabled={disabled ? '' : undefined}
                className={clsx(rootClass, className)}
                {...composedAttributes()}
                onClick={handleClick}
                {...props}
            >
                {children}
            </ButtonPrimitive>
        );
    });

Button.displayName = COMPONENT_NAME;

export default Button;
