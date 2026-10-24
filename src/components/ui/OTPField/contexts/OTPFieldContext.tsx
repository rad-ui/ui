'use client';

import React from 'react';

export type OTPFieldValidationType = 'numeric' | 'alpha' | 'alphanumeric' | 'none';

export type OTPFieldContextValue = {
    rootClass: string;
    /** The code, one character per slot. */
    value: string;
    /** The latest code, readable in event handlers before a re-render. */
    valueRef: React.MutableRefObject<string>;
    length: number;
    validationType: OTPFieldValidationType;
    type: 'text' | 'password';
    disabled: boolean;
    readOnly: boolean;
    /** Registers a slot's input; returns an unregister function. */
    registerInput: (element: HTMLInputElement) => () => void;
    /** The slot index of an input, from its position in the document. */
    indexOf: (element: HTMLInputElement | null) => number;
    focusSlot: (index: number) => void;
    /** Writes `text` starting at `index`, keeping only allowed characters. */
    insertAt: (index: number, text: string) => void;
    /** Removes the character at `index`, shifting the rest left. */
    removeAt: (index: number) => void;
};

const OTPFieldContext = React.createContext<OTPFieldContextValue | null>(null);

export const useOTPFieldContext = (part: string) => {
    const context = React.useContext(OTPFieldContext);
    if (!context) throw new Error(`OTPField.${part} must be rendered inside OTPField.Root.`);
    return context;
};

export default OTPFieldContext;
