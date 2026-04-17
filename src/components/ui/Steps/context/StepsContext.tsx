import { createContext, useContext } from 'react';

export type StepsOrientation = 'horizontal' | 'vertical';

export interface StepsContextValue {
  orientation: StepsOrientation;
  currentStep: number;
  rootClass: string;
  setCurrentStep: (step: number) => void;
}

const StepsContext = createContext<StepsContextValue | null>(null);

export const useStepsContext = () => {
    const context = useContext(StepsContext);
    if (!context) {
        throw new Error('useStepsContext must be used within a StepsContext.Provider');
    }
    return context;
};

export default StepsContext;
