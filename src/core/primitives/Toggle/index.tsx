import React, { useState } from 'react';

import Primitive from '~/core/primitives/Primitive';

export interface TogglePrimitiveProps {
    defaultPressed? : boolean | false;
    pressed: boolean;
    children?: React.ReactNode;
    className?: string;
    label?: string;
    onPressedChange : (isPressed:boolean) => void;

}
const TogglePrimitive = ({ children, label = '', defaultPressed, pressed, onPressedChange, ...props }:TogglePrimitiveProps) => {
    const [isPressed, setIsPressed] = useState(pressed || defaultPressed);

    const handlePressed = () => {
        const updatedPressed = !isPressed;
        setIsPressed(updatedPressed);
        onPressedChange(updatedPressed);
    };

    const ariaAttributes:any = label ? { 'aria-label': label } : {};
    ariaAttributes['aria-pressed'] = isPressed ? 'true' : 'false';

    return <Primitive.button
        onClick={handlePressed}
        data-state={isPressed ? 'on' : 'off'}
        {...ariaAttributes}
        {...props}
    >{children}
    </Primitive.button>;
};

export default TogglePrimitive;
