import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { useControllableState } from '~/core/hooks/useControllableState';
import NumberFieldContext from '../contexts/NumberFieldContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';

const COMPONENT_NAME = 'NumberField';

export type NumberFieldRootElement = ElementRef<'div'>;
export type NumberFieldRootProps = {
    customRootClass?: string
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
} & ComponentPropsWithoutRef<'div'>;

const NumberFieldRoot = forwardRef<NumberFieldRootElement, NumberFieldRootProps>(({ children, customRootClass = '', name, defaultValue = '', value, onValueChange, largeStep, step, min, max, disabled, readOnly, required, id, className = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
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
        <div ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} {...props}>
            <NumberFieldContext.Provider value={contextValues}>
                {children}
            </NumberFieldContext.Provider>
        </div>
    );
});

NumberFieldRoot.displayName = COMPONENT_NAME;

export default NumberFieldRoot;
