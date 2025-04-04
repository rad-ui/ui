'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useComposeAttributes, useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Switch';

export type SwitchProps = {
    defaultChecked? : boolean;
    checked?: boolean;
    color?: string;
    variant?: string;
    size?: string;
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;
    onChange : (isChecked:boolean) => void;
    props?: any;
}

const Switch = ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', defaultChecked, checked, onChange, ...props }:SwitchProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [isChecked, setIsChecked] = useState(checked || defaultChecked);

    const handleChecked = () => {
        const updatedState = !isChecked;
        setIsChecked(updatedState);
        onChange(updatedState);
    };

    const dataAttributes = useCreateDataAttribute('switch', { variant, size });
    const accentAttributes = useCreateDataAttribute('accent', { color });
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <>
            <input type='checkbox' className={clsx(rootClass)} {...props} checked= {isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
            <button
                type="button"
                onClick={handleChecked}
                role="switch"
                aria-checked={isChecked}
                {...composedAttributes()}
            ></button>

        </>
    );
};

Switch.displayName = COMPONENT_NAME;
export default Switch;
