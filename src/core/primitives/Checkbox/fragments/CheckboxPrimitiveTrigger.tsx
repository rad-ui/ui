'use client';

import React, { HTMLAttributes } from 'react';
import Primitive from '~/core/primitives/Primitive';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

export type CheckboxPrimitiveTriggerProps = {
     children: React.ReactNode;
     className?: string;
    }& HTMLAttributes<HTMLButtonElement>;

const CheckboxPrimitiveTrigger = ({ children, className = '', ...props }: CheckboxPrimitiveTriggerProps) => {
    const { isChecked, setIsChecked, id, required, disabled } = React.useContext(CheckboxPrimitiveContext);
    return <Primitive.button onClick={() => setIsChecked(!isChecked)} role="checkbox" id={id} aria-checked={isChecked} aria-required={required} data-checked={isChecked} disabled={disabled} data-disabled={disabled} {...props} className={className}>{children}</Primitive.button>;
};

export default CheckboxPrimitiveTrigger;
