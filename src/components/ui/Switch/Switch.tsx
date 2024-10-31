'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
const COMPONENT_NAME = 'Switch';

export type SwitchProps = {
    defaultChecked? : boolean;
    checked: boolean;
    color: string;
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;
    onChange : (isChecked:boolean) => void;
    props?: any;
}

const Switch = ({ children, customRootClass = '', className = '', color = '', defaultChecked, checked, onChange, ...props }:SwitchProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [isChecked, setIsChecked] = useState(checked || defaultChecked);

    const handleChecked = () => {
        const updatedState = !isChecked;
        setIsChecked(updatedState);
        onChange(updatedState);
    };
    return (
        <>
            <input type='checkbox' className={`${rootClass}`} {...props} checked= {isChecked}/>
            <button type="button" onClick={handleChecked} role="switch">
                {isChecked ? 'on' : 'off'}</button>
        </>
    );
};

Switch.displayName = COMPONENT_NAME;
export default Switch;
