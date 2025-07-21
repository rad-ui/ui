import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';

const NumberFieldInput = () => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldInput must be used within a NumberField');
        return null;
    }
    const {
        inputValue,
        handleStep,
        handleLargeStep,
        id,
        name,
        disabled,
        readOnly,
        required
    } = context;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp') {
            handleStep({ increment: true });
        }
        if (event.key === 'ArrowDown') {
            handleStep({ decrement: true });
        }
        if (event.key === 'ArrowUp' && event.shiftKey) {
            handleLargeStep({ increment: true });
        }
        if (event.key === 'ArrowDown' && event.shiftKey) {
            handleLargeStep({ decrement: true });
        }
    };
    return (
        <input type="number" onKeyDown={handleKeyDown} value={inputValue} id={id} name={name} disabled={disabled} readOnly={readOnly} required={required}/>
    );
};

export default NumberFieldInput;
