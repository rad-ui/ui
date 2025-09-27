import React from 'react';

export type NumberFieldContextType = {
  inputValue: number|'';
  formattedValue: string;
  locale?: string;
  handleOnChange: (input: string) => void;
  handleStep: (opts: { direction: 'increment' | 'decrement'; type: 'small' | 'large' }) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  rootClass?: string;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;