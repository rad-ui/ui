import React from 'react';
import { useControllableState } from '~/core/hooks/useControllableState';
import NumberFieldContext from '../contexts/NumberFieldContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'NumberField';

export type NumberFieldRootProps = {
    name?: string
    defaultValue?: number | ''
    value?: number | ''
    onValueChange?: (value: number | '') => void
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

const NumberFieldRoot = ({ children, name, defaultValue = '', value, onValueChange, largeStep, step, min, max, disabled, readOnly, required, id, className, ...props }: NumberFieldRootProps) => {
    const rootClass = customClassSwitcher(className, COMPONENT_NAME);
    const [inputValue, setInputValue] = useControllableState<number | ''>(
        value,
        defaultValue,
        onValueChange);

    const handleOnChange = (input: number| '') => {
        if (input === '') {
            setInputValue('');
            return;
        }
        if (max !== undefined && input > max) {
            setInputValue(max);
            return;
        }

        if (min !== undefined && input < min) {
            setInputValue(min);
            return;
        }

        setInputValue(input);
    };
    const applyStep = (amount: number) => {
        setInputValue((prev) => {
            let temp = prev;
            if (temp === '') {
                if (min !== undefined) {
                    temp = min;
                }
                temp = -1;
            }
            const nextValue = temp + amount;

            if (max !== undefined && nextValue > max) {
                return max;
            }

            if (min !== undefined && nextValue < min) {
                return min;
            }

            return nextValue;
        });
    };

    const handleStep = ({ type, direction } : {type: 'small'| 'large', direction: 'increment' | 'decrement' }) => {
        let amount = 0;

        switch (type) {
        case 'small':
            if (!step) return;
            amount = step;
            break;
        case 'large':
            if (!largeStep) return;
            amount = largeStep;
            break;
        }

        if (direction === 'decrement') {
            amount *= -1;
        }

        applyStep(amount);
    };

    const contextValues = {
        inputValue,
        setInputValue,
        applyStep,
        handleOnChange,
        handleStep,
        id,
        name,
        disabled,
        readOnly,
        required,
        rootClass
    };

    return (
        <div className={clsx(`${rootClass}-root`, className)} {...props}>
            <NumberFieldContext.Provider value={contextValues}>
                {children}
            </NumberFieldContext.Provider>
        </div>
    );
};

export default NumberFieldRoot;
