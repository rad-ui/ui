import React from 'react';

export type NumberFieldContextType = {
  inputValue: number;
  handleStep: (opts: { increment?: boolean; decrement?: boolean }) => void;
  handleLargeStep: (opts: { increment?: boolean; decrement?: boolean }) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;
