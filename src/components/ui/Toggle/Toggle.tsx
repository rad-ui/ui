import React, { useState } from 'react';

import { customClassSwitcher } from '~/core';

import TogglePrimitive from '~/core/primitives/Toggle';

const COMPONENT_NAME = 'Toggle';

export type ToggleProps = {
    defaultPressed?: boolean;
    pressed: boolean;
    customRootClass? : string;
    disabled? : boolean;
    children? : React.ReactNode;
    className? : string;
    onChange : (isPressed:boolean) => void;

};

const Toggle: React.FC<ToggleProps> = ({
    defaultPressed = false,
    customRootClass = '',
    children,
    className = '',
    pressed = false,
    onChange,
    ...props
}) => {
    if (typeof pressed !== 'boolean') {
        throw new Error('Toggle: pressed prop must be a boolean');
    }

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [isPressed, setIsPressed] = useState(pressed);

    const handlePressed = () => {
        const updatedPressed = !isPressed;
        setIsPressed(updatedPressed);
        onChange(updatedPressed);
    };

    return (

        <TogglePrimitive
            className={`${rootClass}`}
            pressed={isPressed}
            onPressedChange={handlePressed}
            data-state={isPressed ? 'on' : 'off'}
            data-disabled={props.disabled ? '' : undefined}
            {...props}>
            {children}
        </TogglePrimitive>
    );
};

Toggle.displayName = COMPONENT_NAME;

export default Toggle;
