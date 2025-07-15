'use client';

import React from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

export type CheckboxPrimitiveIndicatorProps = {
    className?: string
    children: React.ReactNode
}

const CheckboxPrimitiveIndicator = ({ children, className = '', ...props }: CheckboxPrimitiveIndicatorProps) => {
    const { isChecked } = React.useContext(CheckboxPrimitiveContext);

    if (!isChecked) return null;

    return <span className={className} {...props}>{children}</span>;
};

export default CheckboxPrimitiveIndicator;
