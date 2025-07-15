'use client';

import React from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

const CheckboxPrimitiveIndicator = ({ children }: { children: React.ReactNode }) => {
    const { isChecked } = React.useContext(CheckboxPrimitiveContext);

    if (!isChecked) return null;

    return <span>{children}</span>;
};

export default CheckboxPrimitiveIndicator;
