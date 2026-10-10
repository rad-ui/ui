import React from 'react';

export type NumberFieldStepDirection = 'increment' | 'decrement';
export type NumberFieldStepType = 'small' | 'large';

export type NumberFieldContextType = {
  inputValue: number|'';
  handleOnChange: (input: number|'') => void;
  handleStep: (opts: { direction: NumberFieldStepDirection; type: NumberFieldStepType }) => boolean;
  /** Clamps the current value into [min, max] and snaps it to step precision. */
  commitValue: () => void;
  /** Jumps to min (`'min'`) or max (`'max'`) when that bound is defined. */
  setToBound: (bound: 'min' | 'max') => void;
  canIncrement: boolean;
  canDecrement: boolean;
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  rootClass?: string;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;
