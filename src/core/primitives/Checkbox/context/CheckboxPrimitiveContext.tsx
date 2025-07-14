'use client';

import React from 'react';

export interface CheckboxPrimitiveContextProps {
    isChecked: boolean,
    setIsChecked: (value:boolean) => void,
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
