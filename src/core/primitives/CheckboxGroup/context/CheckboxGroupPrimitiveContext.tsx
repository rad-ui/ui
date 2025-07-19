'use client';

import React from 'react';

export interface CheckboxGroupPrimitiveContextProps {
    checkedValues: string[],
    setCheckedValues: (value: string[]) => void,
    name?: string,
    required?: boolean,
    disabled?: boolean
}

const CheckboxGroupPrimitiveContext = React.createContext<CheckboxGroupPrimitiveContextProps>({
    checkedValues: [],
    setCheckedValues: () => {},
    name: '',
    required: false,
    disabled: false
});

export default CheckboxGroupPrimitiveContext;
