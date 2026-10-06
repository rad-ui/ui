import React from 'react';

type TextFieldContextValue = {
    rootClass: string;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    clearInput: () => void;
    hasValue: boolean;
    setHasValue: React.Dispatch<React.SetStateAction<boolean>>;
    /** True when the input is disabled or read-only, so it cannot be cleared. */
    isLocked: boolean;
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextFieldContext = React.createContext<TextFieldContextValue>({
    rootClass: '',
    inputRef: { current: null },
    clearInput: () => {},
    hasValue: false,
    setHasValue: () => false,
    isLocked: false,
    setIsLocked: () => false
});

export default TextFieldContext;
