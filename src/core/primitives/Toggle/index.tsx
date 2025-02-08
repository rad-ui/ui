import React, { useState } from 'react';

import Primitive from '~/core/primitives/Primitive';
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
    // TODO: remove after introducing TS support for Primitive and its sub-components
    asChild?: any;
}

const TogglePrimitive = ({
    children,
    label = '',
    defaultPressed = false,
    pressed: controlledPressed,
    onPressedChange = () => {},
    disabled,
    ...props
}: TogglePrimitiveProps) => {
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);

    const isControlled = controlledPressed !== undefined;
    const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleTogglePressed = composeEventHandlers(props.onClick, () => {
        if (disabled) {
            return;
        }

        const updatedPressed = !isPressed;
        if (!isControlled) {
            setUncontrolledPressed(updatedPressed);
        }
        onPressedChange(updatedPressed);
    });

    const handleKeyDown = (event: any) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            handleTogglePressed(event);
        }
    };

    const ariaAttributes:any = label ? { 'aria-label': label } : {};
    ariaAttributes['aria-pressed'] = isPressed ? 'true' : 'false';
    ariaAttributes['aria-disabled'] = disabled ? 'true' : 'false';

    return <Primitive.button
        onClick={composeEventHandlers(props.onClick, handleTogglePressed)}
        onKeyDown={composeEventHandlers(props.onKeyDown, handleKeyDown)}
        data-state={isPressed ? 'on' : 'off'}
        disabled={disabled}
        {...ariaAttributes}
        {...props}
    >{children}
    </Primitive.button>;
};

export default TogglePrimitive;
