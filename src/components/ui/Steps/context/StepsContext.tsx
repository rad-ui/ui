import { createContext } from 'react';

export type StepsOrientation = 'horizontal' | 'vertical';

export interface StepsContextValue {
  orientation: StepsOrientation;
  currentStep: number;
  rootClass: string;
  setCurrentStep: (step: number) => void;
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

export default SplitterContext;
