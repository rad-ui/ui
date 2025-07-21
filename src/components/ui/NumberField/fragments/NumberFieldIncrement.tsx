import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';

export type NumberFieldIncrementProps = {
    className?: string
    children?: React.ReactNode
}

const NumberFieldIncrement = ({ children, className }: NumberFieldIncrementProps) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldIncrement must be used within a NumberField');
        return null;
    }
    const { handleStep } = context;

    return (
        <button onClick={() => handleStep({ increment: true })}>
            {children}
        </button>
    );
};

export default NumberFieldIncrement;
