import React from 'react';

export interface RadioGroupContextValue {
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    onChange?: (value: string) => void;
    groupDisabled: boolean;
    /**
     * True while a roving-focus navigation key (arrows/Home/End) is being handled.
     * Focus that arrives through keyboard navigation checks the radio; focus that
     * arrives via Tab or pointer does not (WAI-ARIA radio group pattern).
     */
    isNavigatingWithKeyboardRef?: React.MutableRefObject<boolean>;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export default RadioGroupContext;
