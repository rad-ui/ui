import React, { useState } from 'react';
import { clsx } from 'clsx';
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
    color?: string;
    onChange : (isPressed:boolean) => void;

};

const Toggle: React.FC<ToggleProps> = ({
    defaultPressed = false,
    customRootClass = '',
    children,
    className = '',
    color = '',
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
    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return (

        <TogglePrimitive
            className={clsx(rootClass, className)}
            pressed={isPressed}
            onPressedChange={handlePressed}
            data-state={isPressed ? 'on' : 'off'}
            data-disabled={props.disabled ? '' : undefined}
            {...props}
            {...data_attributes}
        >
            {children}
        </TogglePrimitive>
    );
};

Toggle.displayName = COMPONENT_NAME;

export default Toggle;
