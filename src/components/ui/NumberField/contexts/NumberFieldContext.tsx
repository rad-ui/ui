import React from 'react';

export type NumberFieldStepDirection = 'increment' | 'decrement';
/** `small` is the regular step, `large` is Shift (or PageUp/PageDown) and `fine` is Alt/Option. */
export type NumberFieldStepType = 'small' | 'large' | 'fine';

/** The step type a key or pointer event asks for: Shift for `largeStep`, Alt/Option for `smallStep`. */
export const getStepType = (event: { shiftKey: boolean; altKey: boolean }): NumberFieldStepType => {
    if (event.shiftKey) return 'large';
    if (event.altKey) return 'fine';
    return 'small';
};

export type NumberFieldContextType = {
  inputValue: number|'';
  handleOnChange: (input: number|'') => void;
  handleStep: (opts: { direction: NumberFieldStepDirection; type: NumberFieldStepType }) => boolean;
  /** Clamps the current value into [min, max] and snaps it to step precision. */
  commitValue: () => void;
  /** Jumps to min (`'min'`) or max (`'max'`) when that bound is defined. */
  setToBound: (bound: 'min' | 'max') => void;
  /** Reports the value to `onValueCommit` if it changed since the last report. */
  notifyCommit: () => void;
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
  format?: Intl.NumberFormatOptions;
  locale?: string;
  allowWheelScrub?: boolean;
  allowOutOfRange?: boolean;
  form?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const NumberFieldContext = React.createContext<NumberFieldContextType | null>(null);

export default NumberFieldContext;
