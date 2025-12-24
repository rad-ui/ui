import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useState, useEffect } from 'react';
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
    min?: number
    max?: number
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    locale?: string
} & ComponentPropsWithoutRef<'div'>;

const NumberFieldRoot = forwardRef<NumberFieldRootElement, NumberFieldRootProps>(({ children, name, defaultValue = '', value, onValueChange, largeStep, step = 1, min, max, disabled, readOnly, required, id, className, locale, onFocus, onBlur, ...props }, ref) => {
    const rootClass = customClassSwitcher(className, COMPONENT_NAME);
    const [inputValue, setInputValue] = useControllableState<number | ''>(
        value,
        defaultValue,
        onValueChange);
        
    const [isTyping, setIsTyping] = useState(false);
    const [stringValue, setStringValue] = useState('');

    useEffect(() => {
        if (!isTyping) {
            const formatted = inputValue === '' ? '' : new Intl.NumberFormat(locale ? locale : 'en-US', { maximumFractionDigits: 20 }).format(inputValue);
            setStringValue(formatted);
        }
    }, [inputValue, isTyping, locale]);

    const getDecimalSeparator = (locale: string) => {
        const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
        return parts.find(part => part.type === 'decimal')?.value || '.';
    }

    const parseAndSetValue = (val: string) => {
        if (val === '') {
            setInputValue('');
            return;
        }

        const decimal = getDecimalSeparator(locale || 'en-US');
        let isNegative = false;
        let numberString = val;

        if (val.startsWith('-')) {
            isNegative = true;
            numberString = val.substring(1);
        }

        const regex = new RegExp(`[^0-9${decimal}]`, 'g');
        const cleaned = numberString.replace(regex, '');
        const normalized = cleaned.replace(decimal, '.');
        let numericValue = parseFloat(normalized);

        if (isNaN(numericValue)) {
            // If parsing fails (e.g., user just typed "-"), do nothing with the numeric value
            // but keep the string value for the input.
            return;
        }

        if (isNegative) {
            numericValue *= -1;
        }

        if (max !== undefined && numericValue > max) {
            numericValue = max;
        }

        if (min !== undefined && numericValue < min) {
            numericValue = min;
        }

        setInputValue(numericValue);
    }

    const handleOnChange = (val: string) => {
        setStringValue(val);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTyping(true);
        const currentStringValue = inputValue === '' ? '' : inputValue.toString().replace('.', getDecimalSeparator(locale || 'en-US'));
        setStringValue(currentStringValue);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTyping(false);
        parseAndSetValue(stringValue);
        onBlur?.(e);
    };

    const applyStep = (amount: number) => {
        const valueToStep = isTyping ? parseFloat(stringValue.replace(getDecimalSeparator(locale || 'en-US'), '.')) : (inputValue || 0);
        
        let startingValue = valueToStep;
        if(isNaN(valueToStep)) {
            startingValue = 0;
        }

        let nextValue = startingValue + amount;

        if (max !== undefined && nextValue > max) {
            nextValue = max;
        }

        if (min !== undefined && nextValue < min) {
            nextValue = min;
        }

        setInputValue(nextValue);
        
        const nextStringValue = nextValue.toString().replace('.', getDecimalSeparator(locale || 'en-US'));
        setStringValue(nextStringValue);
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
        formattedValue: stringValue,
        locale,
        handleOnChange,
        handleStep,
        id,
        name,
        disabled,
        readOnly,
        required,
        rootClass,
        onFocus: handleFocus,
        onBlur: handleBlur,
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