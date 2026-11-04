'use client';
import React, {
    forwardRef,
    useCallback,
    useRef,
    useState,
    ComponentPropsWithoutRef,
    ElementRef
} from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

// make the color prop default accent color
const COMPONENT_NAME = 'Button';

/**
 * What an `asChild` Button actually rendered: a native button, a link, or something else (span, div,
 * custom element). Read from the mounted element rather than from `children.type`, which can differ
 * between the server render and hydration (children crossing a server/client boundary), and which
 * can't see through components like `next/link` that render an <a>.
 */
type ChildKind = 'button' | 'link' | 'other';

function kindOf(node: Element): ChildKind {
    if (node.tagName === 'BUTTON') return 'button';
    if ((node.tagName === 'A' || node.tagName === 'AREA') && node.hasAttribute('href')) return 'link';
    return 'other';
}

export type ButtonProps = {
    customRootClass?: string;
    variant?: string;
    size?: string;
    color?: string;
    /**
     * Keep a disabled button in the tab order. It still won't activate, but
     * keyboard and screen reader users can reach it, for example to read a
     * tooltip explaining why it's disabled, or so focus isn't lost when a
     * button disables itself while a request is pending.
     */
    focusableWhenDisabled?: boolean;
    /**
     * A solid button filled with the text colour and labelled in the background colour,
     * so it reads as the one main action without an accent hue (light on dark, dark on
     * light). Applies to the default and `solid` variants. Sets `data-high-contrast`.
     */
    highContrast?: boolean;
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
        focusableWhenDisabled = false,
        highContrast = false,
        onClick,
        onClickCapture,
        onAuxClickCapture,
        onKeyDown,
        onKeyUp,
        onBlur,
        asChild = false,
        tabIndex,
        ...props
    }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME, 'root');
        // apply data attribute for accent color
        // apply attribute only if color is present
        const dataAttributes = createDataAttributes('button', { variant, size, highContrast });
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

        // Until the child has mounted, render only what is the same on the server and the client:
        // no role, type or tabIndex of our own. After mount, add just what the element lacks.
        const [childKind, setChildKind] = useState<ChildKind | null>(null);
        const nodeRef = useRef<HTMLElement | null>(null);
        const spacePressedRef = useRef(false);
        const composedRef = useCallback(mergeRefs(ref, nodeRef), [ref]);
        useLayoutEffect(() => {
            if (!asChild || !nodeRef.current) return;
            const next = kindOf(nodeRef.current);
            setChildKind((current) => (current === next ? current : next));
        });

        const childIsNativeButton = childKind === 'button';
        // `asChild` can turn Button into a span, div, or custom component. Those elements
        // do not get native button focus/keyboard behavior, so add only the missing pieces.
        const childNeedsButtonKeyboardSupport = asChild && childKind === 'other';
        const resolvedTabIndex = !asChild
            ? tabIndex
            : disabled && !focusableWhenDisabled && childKind !== null && !childIsNativeButton
                ? -1
                : childNeedsButtonKeyboardSupport && tabIndex === undefined
                    ? 0
                    : tabIndex;
        // `null` (not undefined) so ButtonPrimitive's own defaults don't fill them back in.
        const resolvedRole = !asChild || childNeedsButtonKeyboardSupport ? props.role : (props.role ?? null);
        const resolvedType = !asChild || childIsNativeButton ? type : null;

        const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
            if (disabled) {
                return;
            }

            onKeyDown?.(event);

            if (event.defaultPrevented || !childNeedsButtonKeyboardSupport) {
                return;
            }

            // Like a native button: Enter activates on keydown; Space only stops the page scrolling
            // here and activates once, on keyup (#2289).
            if (event.key === KEYBOARD_KEYS.ENTER) {
                event.preventDefault();
                event.currentTarget.click();
                return;
            }
            if (event.key === KEYBOARD_KEYS.SPACE) {
                event.preventDefault();
                spacePressedRef.current = true;
            }
        };

        const handleKeyUp: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
            onKeyUp?.(event);
            if (event.key !== KEYBOARD_KEYS.SPACE || !spacePressedRef.current) return;
            spacePressedRef.current = false;
            if (disabled || event.defaultPrevented || !childNeedsButtonKeyboardSupport) return;
            event.preventDefault();
            event.currentTarget.click();
        };

        // Focus leaving while Space is held cancels the press, as on a native button.
        const handleBlur: React.FocusEventHandler<HTMLButtonElement> = (event) => {
            spacePressedRef.current = false;
            onBlur?.(event);
        };

        return (
            <ButtonPrimitive
                ref={composedRef}
                asChild={asChild}
                tabIndex={resolvedTabIndex}
                // Native `disabled` removes the button from the tab order, so a
                // focusable disabled button relies on aria-disabled and the
                // click guards above instead.
                disabled={disabled && !focusableWhenDisabled}
                aria-disabled={disabled ? 'true' : undefined}
                data-disabled={disabled ? '' : undefined}
                className={clsx(rootClass, className)}
                {...composedAttributes}
                onClick={handleClick}
                onClickCapture={handleClickCapture}
                onAuxClickCapture={handleAuxClickCapture}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                {...props}
                // After the spread, so asChild children get the resolved values.
                role={resolvedRole as string | undefined}
                type={resolvedType as 'button' | undefined}
            >
                {children}
            </ButtonPrimitive>
        );
    });

Button.displayName = COMPONENT_NAME;

export default Button;
