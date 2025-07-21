import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';

export type NumberFieldDecrementProps = {
    className?: string;
    children?: React.ReactNode
}

const NumberFieldDecrement = ({ children, className }: NumberFieldDecrementProps) => {
    const context = useContext(NumberFieldContext);
    if (!context) {
        console.error('NumberFieldDecrement must be used within a NumberField');
        return null;
    }
    const { handleStep } = context;
    return (
        <button onClick={() => handleStep({ decrement: true })}>
            {children}
        </button>
    );
};

export default NumberFieldDecrement;
