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
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;