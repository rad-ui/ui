import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsItemProps = {
    children?: React.ReactNode
    className?: string
    value: string
}
const CheckboxCardsItem = ({ children, className = '', value, ...props }: CheckboxCardsItemProps) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Trigger className={clsx(`${rootClass}-item`, className)} value={value} {...props}>
            {children}
        </CheckboxGroupPrimitive.Trigger>
    );
};

export default CheckboxCardsItem;
