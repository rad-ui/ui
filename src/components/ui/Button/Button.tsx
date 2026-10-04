'use client';
import React, {
    forwardRef,
    ComponentPropsWithoutRef,
    ElementRef
} from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

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
        onClickCapture,
        onAuxClickCapture,
        asChild = false,
        tabIndex,
        ...props
    }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');
        // apply data attribute for accent color
        // apply attribute only if color is present
        const dataAttributes = createDataAttributes('button', { variant, size });
        const accentAttributes = createDataAccentColorAttribute(color);
        const composedAttributes = composeAttributes(dataAttributes, accentAttributes);

        const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            onClick?.(event);
        };

        // A disabled Button must not activate, whatever element it renders. A native
        // <button disabled> already guarantees that, but with `asChild` the child may be
        // an <a> or a custom element: block the click in the capture phase so neither the
        // child's own onClick (bubble phase) nor link navigation runs.
        const blockWhenDisabled = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const handleClickCapture: React.MouseEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                blockWhenDisabled(event);
                return;
            }
            onClickCapture?.(event);
        };

        // Middle-click on a link opens it via `auxclick`, not `click`.
        const handleAuxClickCapture: React.MouseEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                blockWhenDisabled(event);
                return;
            }
            onAuxClickCapture?.(event);
        };

        // Non-button children cannot use the native `disabled` attribute, so they would
        // stay in the tab order. Remove them, as a native disabled button would be.
        const childIsNativeButton = asChild && React.isValidElement(children) && children.type === 'button';
        const resolvedTabIndex = disabled && asChild && !childIsNativeButton ? -1 : tabIndex;

        return (
            <ButtonPrimitive
                ref={ref}
                type={type}
                asChild={asChild}
                tabIndex={resolvedTabIndex}
                disabled={disabled}
                data-disabled={disabled ? '' : undefined}
                className={clsx(rootClass, className)}
                {...composedAttributes}
                onClick={handleClick}
                onClickCapture={handleClickCapture}
                onAuxClickCapture={handleAuxClickCapture}
                {...props}
            >
                {children}
            </ButtonPrimitive>
        );
    });

Button.displayName = COMPONENT_NAME;

export default Button;
