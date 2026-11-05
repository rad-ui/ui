import React, {
    forwardRef,
    useCallback,
    useRef,
    useState,
    ComponentPropsWithoutRef,
    ElementRef
} from 'react';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { kindOf, type ChildKind } from '~/core/utils/childKind';

/**
 *
 * Notes
 *
 * - A toggle button is a two-state button that can be either off (not pressed) or on (pressed). The aria-pressed attribute values of true or false identify a button as a toggle button.
 * - The aria-pressed attribute is used to indicate the current state of a toggle button. The aria-pressed attribute is used in conjunction with the role attribute set to button.
 *
 * - Menu button: as described in the menu button pattern, a button is revealed to assistive technologies as a menu button if it has the property aria-haspopup set to either menu or true.
 *
 * Resources
 * - https://www.w3.org/WAI/ARIA/apg/patterns/button/
 * - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
 *

 */

export type ButtonPrimitiveProps = {
    label?: string;
    description?: string;
    asChild?: boolean;
    required?: boolean;
    onChange?: any;
} & ComponentPropsWithoutRef<'button'>;

const ButtonPrimitive = forwardRef<
    ElementRef<'button'>,
    ButtonPrimitiveProps
>(({ role, type, label = '', description = '', disabled = false, asChild = false, children, ...props }, ref) => {
    // With `asChild` the child keeps its own semantics: a link stays a link, a native button keeps its
    // type. Until it mounts, render only what is the same on the server and the client (no role or type
    // of our own); after mount, add `role="button"` only to elements that aren't buttons or links, and
    // `type="button"` only to native buttons. `null` from a caller means "leave it off".
    const [childKind, setChildKind] = useState<ChildKind | null>(null);
    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const composedRef = useCallback(mergeRefs(ref, nodeRef), [ref]);
    useLayoutEffect(() => {
        if (!asChild || !nodeRef.current) return;
        const next = kindOf(nodeRef.current);
        setChildKind((current) => (current === next ? current : next));
    });
    const resolvedRole = role !== undefined
        ? role ?? undefined
        : !asChild || childKind === 'other' ? 'button' : undefined;
    const resolvedType = type !== undefined
        ? type ?? undefined
        : !asChild || childKind === 'button' ? 'button' : undefined;

    if (label) {
        // If we have a label, we should set the aria-label attribute
        // This is usually generated automatically by the screen reader
        // But in some cases, we might want to override it, give it a more descriptive label if needed
        props['aria-label'] = label;
    }

    if (description) {
        // If we have a description, we should set the aria-description attribute
        // This is usually generated automatically by the screen reader
        // But in some cases, we might want to override it, give it a more descriptive description if needed
        props['aria-description'] = description;
    }
    if (disabled) {
        // If the button is disabled, we should set the aria-disabled attribute
        // Native `disabled` (and aria-disabled for non-button asChild children) is the
        // semantic. No default aria-description: it made screen readers announce the
        // disabled state twice ("dimmed ... Disabled Button").
        props['aria-disabled'] = 'true';
    }

    return <Primitive.button
        ref={composedRef}
        asChild={asChild}
        role={resolvedRole}
        type={resolvedType}
        disabled={disabled}
        {...props}
        // We allow the user to pass any other props they want
        // Is it a good idea to pass all props? Maybe not, but it's a good starting point
    >{children}</Primitive.button>;
});

ButtonPrimitive.displayName = 'ButtonPrimitive';
export default ButtonPrimitive;
