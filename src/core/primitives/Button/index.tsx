import React, {PropsWithChildren} from 'react';


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

type ButtonPrimitiveProps = {
    label?: string,
    description?: string
    buttonRef?: React.LegacyRef<HTMLButtonElement> | undefined
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PropsWithChildren

// eslint-disable-next-line react/display-name
const ButtonPrimitive = ({role='button', label='', description='', disabled=false, children, buttonRef, ...props}: ButtonPrimitiveProps) => {
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
        props['aria-disabled'] = 'true';
        if (!description) { // If description isn't set, we set a default description
            props['aria-description'] = 'Disabled Button';
        }
    }

    return <button
        ref={buttonRef}
        role={role}
        disabled={disabled}

        {...props}
        // We allow the user to pass any other props they want
        // Is it a good idea to pass all props? Maybe not, but it's a good starting point
    >{children}</button>;
};

export default ButtonPrimitive;
