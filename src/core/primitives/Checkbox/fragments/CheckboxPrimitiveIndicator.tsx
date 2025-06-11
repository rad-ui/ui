'use client';

import React from 'react';
import CheckboxPrimitiveContext from '../context/CheckboxPrimitiveContext';

const CheckboxPrimitiveIndicator = ({ children }: { children: React.ReactNode }) => {
    const { checked } = React.useContext(CheckboxPrimitiveContext);

    if (!checked) return null;

    return <span>{children}</span>;
};

export default CheckboxPrimitiveIndicator;
