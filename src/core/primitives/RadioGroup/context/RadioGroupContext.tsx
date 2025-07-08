import React from 'react';

export interface RadioGroupContextValue {
    checkedItem: string;
    setCheckedItem: (item: string) => void;
    onChange: (item: string) => void;
    groupDisabled: boolean;
    name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export default RadioGroupContext;
