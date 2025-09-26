import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { useControllableState } from '~/core/hooks/useControllableState';
import NumberFieldContext from '../contexts/NumberFieldContext';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'NumberField';

export type NumberFieldRootElement = ElementRef<'div'>;
export type NumberFieldRootProps = {
    name?: string
    defaultValue?: number | ''
    value?: number | ''
    onValueChange?: (value: number | '') => void
    step?: number
    largeStep?: number
    smallStep?: number
    snapOnStep?: boolean
    min?: number
    max?: number
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
} & ComponentPropsWithoutRef<'div'>;

const NumberFieldRoot = forwardRef<NumberFieldRootElement, NumberFieldRootProps>(({ children, name, defaultValue = '', value, onValueChange, largeStep = 10, step = 1, smallStep = 0.1, snapOnStep = false, min, max, disabled, readOnly, required, id, className, ...props }, ref) => {
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
                } else {
                    temp = -1;
                }
            }

            const tempDec = (temp.toString().split('.')[1] || '').length;
            const amountDec = (amount.toString().split('.')[1] || '').length;
            const decimals = Math.max(tempDec, amountDec);
            const factor = Math.pow(10, decimals);
            const scaled = Math.round(temp * factor) + amount * factor;
            let nextValue = scaled / factor;
            nextValue = snapOnStep ? Math.round(nextValue / step) * step : nextValue;

            if (max !== undefined && nextValue > max) {
                return max;
            }

            if (min !== undefined && nextValue < min) {
                return min;
            }

            return nextValue;
        });
    };

    const handleStep = ({ type, direction } : {type: 'small'| 'normal' | 'large', direction: 'increment' | 'decrement' }) => {
        let amount = 0;

        switch (type) {
        case 'normal':
            if (!step) return;
            amount = step;
            break;
        case 'large':
            if (!largeStep) return;
            amount = largeStep;
            break;
        case 'small':
            if (!smallStep) return;
            amount = smallStep;
            break;
        }

        if (direction === 'decrement') {
            amount = -amount;
            console.log(amount);
        }

        applyStep(amount);
    };

    const contextValues = {
        inputValue,
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
        <div ref={ref} className={clsx(`${rootClass}-root`, className)} {...props}>
            <NumberFieldContext.Provider value={contextValues}>
                {children}
            </NumberFieldContext.Provider>
        </div>
    );
});

NumberFieldRoot.displayName = COMPONENT_NAME;

export default NumberFieldRoot;
