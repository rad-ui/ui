'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Switch';

export type SwitchProps = {
    defaultChecked?: boolean;
    checked: boolean;
    children?: React.ReactNode;
    className?: string;
    customRootClass?: string;
    onChange : (isChecked:boolean) => void;
    props?: any;
}

const Switch = ({ children, customRootClass = '', className = '', defaultChecked=true, checked=true, onChange, ...props }:SwitchProps) => {
    
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isChecked, setIsChecked] = useState(checked);
    
    const handleChecked = () => {
        const updatedState = !isChecked;
        setIsChecked(updatedState);
        onChange(updatedState);
    };

    return (
        <div>
            <input type='checkbox' className={clsx(rootClass)} {...props} checked={isChecked}
               onChange={() => {}}
               data-state={isChecked ? 'on' : 'off'}
               aria-checked={isChecked}
               />
            <button type="button" onClick={handleChecked} role="switch"></button>
        </div>
    );
};

Switch.displayName = COMPONENT_NAME;
export default Switch;
