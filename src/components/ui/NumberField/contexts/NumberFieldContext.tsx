import React from 'react';

export type NumberFieldContextType = {
  inputValue: number|'';
  handleOnChange: (input: number|'') => void;
  handleStep: (opts: { direction: 'increment' | 'decrement'; type: 'small' | 'large' }) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  rootClass?: string;
  locale?: string;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;
