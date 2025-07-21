import React, { useContext } from 'react';
import NumberFieldContext from '../contexts/NumberFieldContext';
import clsx from 'clsx';

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
    const { handleStep, rootClass } = context;

    return (
        <button onClick={() => handleStep({ direction: 'increment', type: 'small' })} className={clsx(`${rootClass}-increment`, className)}>
            {children}
        </button>
    );
};

export default NumberFieldIncrement;
