import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useRef } from 'react';
import { useControllableState } from '~/core/hooks/useControllableState';
import NumberFieldContext, { NumberFieldContextType } from '../contexts/NumberFieldContext';
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
    /** Amount added or removed by ArrowUp/ArrowDown and the stepper buttons. Defaults to 1. */
    step?: number
    /** Amount used by Shift+Arrow and PageUp/PageDown. Defaults to `step * 10`. */
    largeStep?: number
    min?: number
    max?: number
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    invalid?: boolean
} & ComponentPropsWithoutRef<'div'>;

const countDecimals = (value: number | undefined): number => {
    if (value === undefined || !Number.isFinite(value)) return 0;
    const text = String(value);
    const exponentMatch = /e-(\d+)$/i.exec(text);
    if (exponentMatch) {
        const [mantissa] = text.split(/e/i);
        const mantissaDecimals = (mantissa.split('.')[1] || '').length;
        return mantissaDecimals + Number(exponentMatch[1]);
    }
    return (text.split('.')[1] || '').length;
};

const isValidStep = (value: number | undefined): value is number => {
    return typeof value === 'number' && Number.isFinite(value) && value > 0;
};

const NumberFieldRoot = forwardRef<NumberFieldRootElement, NumberFieldRootProps>(({ children, customRootClass = '', name, defaultValue = '', value, onValueChange, largeStep, step, min, max, disabled, readOnly, required, invalid, id, className = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [inputValue, setInputValue] = useControllableState<number | ''>(
        value,
        defaultValue,
        onValueChange);

    const resolvedStep = isValidStep(step) ? step : 1;
    const resolvedLargeStep = isValidStep(largeStep) ? largeStep : resolvedStep * 10;

    // Latest value, readable from timers (press-and-hold) without stale closures.
    const valueRef = useRef<number | ''>(inputValue);
    valueRef.current = inputValue;

    const clamp = (input: number) => {
        let next = input;
        if (max !== undefined && next > max) next = max;
        if (min !== undefined && next < min) next = min;
        return next;
    };

    const roundToPrecision = (input: number, ...references: Array<number | undefined>) => {
        const decimals = Math.min(
            Math.max(...references.map(countDecimals)),
            15
        );
        return Number(input.toFixed(decimals));
    };

    const commit = (next: number | '') => {
        if (next === valueRef.current) return;
        valueRef.current = next;
        setInputValue(next);
    };

    // Typing is not clamped per keystroke (that makes multi-digit entry impossible,
    // e.g. typing "50" with min=10). The value is clamped when it is committed
    // on blur / Enter, and native min/max attributes surface out-of-range state.
    const handleOnChange = (input: number | '') => {
        if (input !== '' && !Number.isFinite(input)) return;
        commit(input);
    };

    const commitValue = () => {
        const current = valueRef.current;
        if (current === '') return;
        commit(clamp(current));
    };

    const handleStep: NumberFieldContextType['handleStep'] = ({ type, direction }) => {
        if (disabled || readOnly) return false;
        let amount = type === 'large' ? resolvedLargeStep : resolvedStep;
        if (direction === 'decrement') amount *= -1;

        const current = valueRef.current;
        let next: number;
        if (current === '') {
            // Start from 0 (clamped into range) rather than an arbitrary offset.
            next = clamp(0 + amount);
        } else {
            next = clamp(roundToPrecision(current + amount, current, resolvedStep, resolvedLargeStep, min));
        }

        if (next === current) return false;
        commit(next);
        return true;
    };

    const setToBound: NumberFieldContextType['setToBound'] = (bound) => {
        if (disabled || readOnly) return;
        const target = bound === 'min' ? min : max;
        if (target === undefined) return;
        commit(target);
    };

    const canIncrement = !disabled && !readOnly && (max === undefined || inputValue === '' || inputValue < max);
    const canDecrement = !disabled && !readOnly && (min === undefined || inputValue === '' || inputValue > min);

    const contextValues: NumberFieldContextType = {
        inputValue,
        handleOnChange,
        handleStep,
        commitValue,
        setToBound,
        canIncrement,
        canDecrement,
        id,
        name,
        min,
        max,
        step: resolvedStep,
        disabled,
        readOnly,
        required,
        invalid,
        rootClass
    };

    return (
        <div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-root`, className)}
            {...props}
            data-slot="number-field-root"
            data-disabled={disabled ? '' : undefined}
            data-readonly={readOnly ? '' : undefined}
            data-required={required ? '' : undefined}
            data-invalid={invalid ? '' : undefined}
        >
            <NumberFieldContext.Provider value={contextValues}>
                {children}
            </NumberFieldContext.Provider>
        </div>
    );
});

NumberFieldRoot.displayName = COMPONENT_NAME;

export default NumberFieldRoot;
