import React, { forwardRef, useState } from 'react';

import ButtonPrimitive from '~/core/primitives/Button';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export type TogglePrimitiveElement = React.ElementRef<typeof ButtonPrimitive>;
export interface TogglePrimitiveProps extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive> {
    defaultPressed?: boolean;
    pressed?: boolean;
    label?: string;
    disabled?: boolean;
    onPressedChange?: (isPressed: boolean) => void;
    asChild?: boolean;
}

const TogglePrimitive = forwardRef<TogglePrimitiveElement, TogglePrimitiveProps>(({
    children,
    label = '',
    defaultPressed = false,
    pressed: controlledPressed,
    onPressedChange = () => {},
    disabled,
    asChild = false,
    ...props
}, ref) => {
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);

    const isControlled = controlledPressed !== undefined;
    const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleTogglePressed = () => {
        if (disabled) {
            return;
        }

        const updatedPressed = !isPressed;
        if (!isControlled) {
            setUncontrolledPressed(updatedPressed);
        }
        onPressedChange(updatedPressed);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            handleTogglePressed();
        }
    };

    const ariaAttributes:any = label ? { 'aria-label': label } : {};
    ariaAttributes['aria-pressed'] = isPressed ? 'true' : 'false';
    ariaAttributes['aria-disabled'] = disabled ? 'true' : 'false';

    return <ButtonPrimitive
        ref={ref}
        onClick={composeEventHandlers(props.onClick, handleTogglePressed)}
        onKeyDown={composeEventHandlers(props.onKeyDown, handleKeyDown)}
        data-state={isPressed ? 'on' : 'off'}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        asChild={asChild}
        {...ariaAttributes}
        {...props}
    >{children}
    </ButtonPrimitive>;
});

TogglePrimitive.displayName = 'TogglePrimitive';

export default TogglePrimitive;
