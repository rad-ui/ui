'use client';

import React from 'react';
import Primitive from '~/core/primitives/Primitive';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

const CheckboxPrimitiveTrigger = ({ children, ...props }: { children: React.ReactNode } & Primitive.buttonProps) => {
    const { checked, setChecked } = React.useContext(CheckboxPrimitiveContext);
    return <Primitive.button onClick={() => setChecked(!checked)} {...props}>{children}</Primitive.button>;
};

export default CheckboxPrimitiveTrigger;
