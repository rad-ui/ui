import React, { useState } from 'react';

import Primitive from '~/core/primitives/Primitive';

export interface TogglePrimitiveProps {
    defaultPressed?: boolean;
    pressed?: boolean;
    children?: React.ReactNode;
    className?: string;
    label?: string;
    disabled?: boolean;
    onPressedChange: (isPressed: boolean) => void;
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

    const handlePressed = () => {
        if (disabled) {
            return;
        }

        const updatedPressed = !isPressed;
        if (!isControlled) {
            setUncontrolledPressed(updatedPressed);
        }
        onPressedChange(updatedPressed);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        // TODO: Should these be handled by the browser?
        // Or should we add these functionalities inside the ButtonPrimitive?
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            handlePressed();
        }
    };

    const ariaAttributes:any = label ? { 'aria-label': label } : {};
    ariaAttributes['aria-pressed'] = isPressed ? 'true' : 'false';
    ariaAttributes['aria-disabled'] = disabled ? 'true' : 'false';

    return <Primitive.button
        onClick={handlePressed}
        onKeyDown={handleKeyDown}
        data-state={isPressed ? 'on' : 'off'}
        disabled={disabled}
        {...ariaAttributes}
        {...props}
    >{children}
    </Primitive.button>;
};

export default TogglePrimitive;
