'use client';

import React from 'react';

export interface CheckboxGroupItemContextProps {
   value: string
   checked?: boolean
   setChecked?: (checked: boolean) => void
}

const CheckboxGroupItemContext = React.createContext<CheckboxGroupItemContextProps>({
    value: '',
    checked: false,
    setChecked: () => {}
});

export default CheckboxGroupItemContext;
