'use client';

import React from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';
import CheckboxPrimitiveTrigger from './CheckboxPrimitiveTrigger';

const CheckboxPrimitiveRoot = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const [checked, setChecked] = React.useState(false);

    const contextValues = {
        checked,
        setChecked
    };

    return <CheckboxPrimitiveContext.Provider value={contextValues}>
        <CheckboxPrimitiveTrigger className={className}>
            {children}
        </CheckboxPrimitiveTrigger>
        <input type="checkbox" style={{ display: 'none' }} />
    </CheckboxPrimitiveContext.Provider>;
};

export default CheckboxPrimitiveRoot;
