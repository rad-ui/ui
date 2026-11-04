'use client';

import React from 'react';

export interface CheckboxGroupPrimitiveContextProps {
    checkedValues: string[],
    setCheckedValues: (value: string[]) => void,
    name?: string,
    required?: boolean,
    disabled?: boolean,
    /** Every item's value, so a parent checkbox can check or clear them all. */
    allValues?: string[]
}

const CheckboxGroupPrimitiveContext = React.createContext<CheckboxGroupPrimitiveContextProps>({
    checkedValues: [],
    setCheckedValues: () => {},
    name: '',
    required: false,
    disabled: false
});

export default CheckboxGroupPrimitiveContext;
