import React, { useState } from 'react';

import ButtonPrimitive from '~/core/primitives/Button';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

export interface TogglePrimitiveProps {
    defaultPressed?: boolean;
    pressed?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    label?: string;
    disabled?: boolean;
    onPressedChange?: (isPressed: boolean) => void;
    asChild?: boolean;
}

const TogglePrimitive = ({
    children,
    label = '',
    defaultPressed = false,
    pressed: controlledPressed,
    onPressedChange = () => {},
    disabled,
    asChild = false,
    ...props
}: TogglePrimitiveProps) => {
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
};

export default TogglePrimitive;
