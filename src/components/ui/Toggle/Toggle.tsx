import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import useControllableState from '~/core/hooks/useControllableState';

import TogglePrimitive from '~/core/primitives/Toggle';

const COMPONENT_NAME = 'Toggle';

export type ToggleProps = {
    defaultPressed?: boolean;
    pressed?: boolean; // Make optional to support uncontrolled mode
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
    pressed,
    onChange,
    ...props
}) => {
    // Use our new hook to handle controlled/uncontrolled state
    const [isPressed, setIsPressed] = useControllableState<boolean>(
        pressed,
        defaultPressed,
        onChange
    );

    // We don't need the validation anymore since the hook handles this
    // This is now handled by the hook's type safety and error messages

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return (
        <TogglePrimitive
            className={clsx(rootClass, className)}
            pressed={isPressed}
            onPressedChange={setIsPressed}
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
