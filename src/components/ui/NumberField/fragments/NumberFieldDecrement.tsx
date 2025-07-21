import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

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
    const { handleStep, rootClass } = context;
    return (
        <button onClick={() => handleStep({ direction: 'decrement', type: 'small' })} className={clsx(`${rootClass}-decrement`, className)}>
            {children}
        </button>
    );
};

export default NumberFieldDecrement;
