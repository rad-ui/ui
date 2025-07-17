import React, { useContext } from 'react';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import CheckboxCardsItemContext from '../context/CheckboxCardsItemContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type CheckboxCardsLabelProps = {
    children: React.ReactNode
    className?: string
}

const CheckboxCardsLabel = ({ children, className = '' }: CheckboxCardsLabelProps) => {
    const { rootClass } = useContext(CheckboxCardsRootContext);
    
    return (
        <Primitive.label className={clsx(`${rootClass}-label`, className)} >
            {children}
        </Primitive.label>
    );
};

export default CheckboxCardsLabel;
