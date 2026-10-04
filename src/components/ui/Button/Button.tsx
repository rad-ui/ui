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
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

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
        onKeyDown,
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

        const childType = asChild && React.isValidElement(children) ? children.type : null;
        const childIsNativeButton = childType === 'button';
        const childIsNativeAnchor = childType === 'a';
        // `asChild` can turn Button into a span, div, or custom component. Those elements
        // do not get native button focus/keyboard behavior, so add only the missing pieces.
        const childNeedsButtonKeyboardSupport = asChild && !childIsNativeButton;
        // Anchors are already tabbable when they have href; spans/custom elements are not.
        const childNeedsTabIndex = childNeedsButtonKeyboardSupport && !childIsNativeAnchor;
        const resolvedTabIndex = disabled && childNeedsButtonKeyboardSupport
            ? -1
            : childNeedsTabIndex && tabIndex === undefined
                ? 0
                : tabIndex;

        const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                return;
            }

            onKeyDown?.(event);

            if (event.defaultPrevented || !childNeedsButtonKeyboardSupport) {
                return;
            }

            // Native anchors already activate on Enter. Space does not activate anchors,
            // but ARIA buttons are expected to respond to both Enter and Space.
            const shouldActivate = event.key === KEYBOARD_KEYS.SPACE ||
                (!childIsNativeAnchor && event.key === KEYBOARD_KEYS.ENTER);

            if (!shouldActivate) {
                return;
            }

            event.preventDefault();
            event.currentTarget.click();
        };

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
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </ButtonPrimitive>
        );
    });

Button.displayName = COMPONENT_NAME;

export default Button;
