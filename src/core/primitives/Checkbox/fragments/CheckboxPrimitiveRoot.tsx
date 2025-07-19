'use client';

import React from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import CheckboxPrimitiveTrigger from './CheckboxPrimitiveTrigger';
import useControllableState from '~/core/hooks/useControllableState';

export type CheckboxPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    checked?: boolean,
    defaultChecked? : boolean,
    onCheckedChange? : () => void,
    disabled?: boolean
    required?: boolean
    name?: string
    value?: string
    id?: string
};

const CheckboxPrimitiveRoot = ({ children, className = '', checked, defaultChecked = false, onCheckedChange, disabled, required, name, value, id, ...props }: CheckboxPrimitiveRootProps) => {
    const [isChecked, setIsChecked] = useControllableState(
        checked,
        defaultChecked,
        onCheckedChange
    );

    const contextValues = {
        isChecked,
        setIsChecked,
        id,
        required,
        disabled
    };

    return <CheckboxPrimitiveContext.Provider value={contextValues}>
        <CheckboxPrimitiveTrigger className={className} {...props}>
            {children}
        </CheckboxPrimitiveTrigger>
        <input
            type="checkbox" style={{
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0,
                margin: 0,
                transform: 'translateX(-100%)'
            }} name={name} value={value} checked={isChecked} disabled={disabled} required={required} {...props}/>
    </CheckboxPrimitiveContext.Provider>;
};

export default CheckboxPrimitiveRoot;
