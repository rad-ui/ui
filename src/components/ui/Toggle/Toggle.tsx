import React, { useState } from 'react';

import { customClassSwitcher } from '~/core';

import ButtonPrimitive from '~/core/primitives/Button';

const COMPONENT_NAME = 'Toggle';

export type ToggleProps = {
    defaultPressed? : boolean | false ;
    pressed : boolean;
    customRootClass? : string;
    disabled? : boolean;
    children? : React.ReactNode;
    className? : string;
    onChange : (isPressed:boolean) => void;

};

const Toggle: React.FC<ToggleProps> = ({
    defaultPressed,
    customRootClass = '',
    children,
    className = '',
    pressed,
    onChange,
    ...props
}) => {

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [isPressed, setIsPressed] = useState(pressed || defaultPressed);

    const handlePressed = () => {
        const updatedPressed = !isPressed;
        setIsPressed(updatedPressed);
        onChange(updatedPressed);
    };

    return (
       
        <ButtonPrimitive
            className={`${rootClass}`} onClick ={handlePressed}
            data-state={isPressed ? 'on' : 'off'}
            type='button'
            data-disabled={props.disabled ? '' : undefined}
            aria-pressed={pressed} {...props}>
            {children}
        </ButtonPrimitive>
    );
};

Toggle.displayName = COMPONENT_NAME;

export default Toggle;
