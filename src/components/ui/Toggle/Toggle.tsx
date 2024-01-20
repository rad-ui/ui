import React, {useState} from 'react';

import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'Toggle';

export type ToggleProps = {
    defaultPressed? : boolean | false ;
    pressed : boolean;
    customRootClass? : string;
    disabled? : boolean;
    children? : React.ReactNode;
    className? : string;
    onChange : () => void;
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

    const [isPressed=false, setIsPressed] = useState(defaultPressed);

    const handlePressed = () => {
        setIsPressed(!isPressed);
        console.log(isPressed);
        onChange();
    };

    return (
        <button
            className={`${rootClass}`} onClick={handlePressed}
            data-state={isPressed ? 'on' : 'off'}
            type="button"
            data-disabled={props.disabled ? '' : undefined}
            aria-pressed={pressed} {...props}>
            {children}
        </button>
    );
};

export default Toggle;
