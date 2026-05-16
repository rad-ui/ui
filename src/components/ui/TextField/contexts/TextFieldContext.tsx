import React from 'react';

type TextFieldContextValue = {
    rootClass: string;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    clearInput: () => void;
    hasValue: boolean;
    setHasValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextFieldContext = React.createContext<TextFieldContextValue>({
    rootClass: '',
    inputRef: { current: null },
    clearInput: () => {},
    hasValue: false,
    setHasValue: () => false
});

export default TextFieldContext;
