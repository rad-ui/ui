'use client';

import React from 'react';

export interface CheckboxPrimitiveContextProps {
    isChecked: boolean | 'indeterminate' | null,
    setIsChecked: (value: boolean | 'indeterminate' | null) => void,
    id?: string,
    required?: boolean,
    disabled?: boolean
}

const CheckboxPrimitiveContext = React.createContext<CheckboxPrimitiveContextProps>({
    isChecked: false,
    setIsChecked: () => {},
    id: '',
    required: false,
    disabled: false
});

export default CheckboxPrimitiveContext;
