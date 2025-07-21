import React from 'react';
import { useControllableState } from '~/core/hooks/useControllableState';
import NumberFieldContext from '../contexts/NumberFieldContext';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'NumberField';

export type NumberFieldRootProps = {
    name?: string
    defaultValue: number
    value?: number
    onValueChange?: (value: number) => void
    step?: number
    largeStep?: number
    min?: number
    max?: number
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    id?: string
    className?: string
    children?: React.ReactNode
};

const NumberFieldRoot = ({ children, name, defaultValue, value, onValueChange, largeStep, step, min, max, disabled, readOnly, required, id, className, ...props }: NumberFieldRootProps) => {
    const rootClass = customClassSwitcher(className, COMPONENT_NAME);
    const [inputValue, setInputValue] = useControllableState(
        value,
        defaultValue,
        onValueChange);

    const handleStep = ({ increment, decrement }: {increment?: boolean, decrement?: boolean}) => {
        if (step) {
            if (increment) {
                if (max) {
                    if (inputValue + step > max) {
                        setInputValue(max);
                        return;
                    }
                }
                setInputValue(inputValue + step);
            } else if (decrement) {
                if (min) {
                    if (inputValue - step < min) {
                        setInputValue(min);
                        return;
                    }
                }
                setInputValue(inputValue - step);
            }
        }
    };

    const handleLargeStep = ({ increment, decrement }: {increment?: boolean, decrement?: boolean}) => {
        if (largeStep) {
            if (increment) {
                if (max) {
                    if (inputValue + largeStep > max) {
                        setInputValue(max);
                        return;
                    }
                }
                setInputValue(inputValue + largeStep);
            } else if (decrement) {
                if (min) {
                    if (inputValue - largeStep < min) {
                        setInputValue(min);
                        return;
                    }
                }
                setInputValue(inputValue - largeStep);
            }
        }
    };

    const contextValues = {
        inputValue,
        handleStep,
        handleLargeStep,
        id,
        name,
        disabled,
        readOnly,
        required
    };

    return (
        <div>
            <NumberFieldContext.Provider value={contextValues}>
                {children}
            </NumberFieldContext.Provider>
        </div>
    );
};

export default NumberFieldRoot;
