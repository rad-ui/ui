import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

export type NumberFieldInputProps = {
    className?: string
}
const NumberFieldInput = ({ className }: NumberFieldInputProps) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldInput must be used within a NumberField');
        return null;
    }
    const {
        inputValue,
        handleOnChange,
        handleStep,
        id,
        name,
        disabled,
        readOnly,
        required,
        rootClass
    } = context;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'small' });
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'small' });
        }
        if (event.key === 'ArrowUp' && event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'increment', type: 'large' });
        }
        if (event.key === 'ArrowDown' && event.shiftKey) {
            event.preventDefault();
            handleStep({ direction: 'decrement', type: 'large' });
        }
    };
    return (
        <input type="number" onKeyDown={handleKeyDown} value={inputValue === '' ? '' : inputValue} onChange={(e) => { const val = e.target.value; handleOnChange(val === '' ? '' : Number(val)); }} id={id} name={name} disabled={disabled} readOnly={readOnly} required={required} className={clsx(`${rootClass}-input`, className)}/>
    );
};

export default NumberFieldInput;
