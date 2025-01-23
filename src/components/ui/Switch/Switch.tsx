'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'Switch';

export type SwitchProps = {
    defaultChecked? : boolean;
    checked?: boolean;
    color?: string;
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
        onChange(updatedState)
    };

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }
    return (
        <>
            <input type='checkbox' className={clsx(rootClass)} {...props} checked= {isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
            <button type="button" onClick={handleChecked} role="switch" {...data_attributes}></button>
           
        </>
    );
};

Switch.displayName = COMPONENT_NAME;
export default Switch;
