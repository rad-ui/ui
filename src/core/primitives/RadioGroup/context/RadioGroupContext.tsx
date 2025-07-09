import React from 'react';

export interface RadioGroupContextValue {
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    onChange?: (value: string) => void;
    groupDisabled: boolean;
    name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export default RadioGroupContext;
