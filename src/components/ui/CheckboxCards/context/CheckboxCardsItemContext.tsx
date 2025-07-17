'use client';

import React from 'react';

export interface CheckboxCardsItemContextProps {
   value: string
   checked?: boolean
   setChecked?: (checked: boolean) => void
}

const CheckboxCardsItemContext = React.createContext<CheckboxCardsItemContextProps>({
    value: '',
    checked: false,
    setChecked: () => {}
});

export default CheckboxCardsItemContext;
