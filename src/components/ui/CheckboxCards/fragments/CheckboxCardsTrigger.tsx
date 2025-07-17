import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import CheckboxCardsItemContext from '../context/CheckboxCardsItemContext';

export type CheckboxCardsTriggerProps = {
    children?: React.ReactNode
    className?: string
}
const CheckboxCardsTrigger = ({ children, className = '', ...props }: CheckboxCardsTriggerProps) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);
    const { value, checked, setChecked } = React.useContext(CheckboxCardsItemContext);

    return (
        <CheckboxGroupPrimitive.Item className={clsx(`${rootClass}-trigger`, className)} value={value} checked={checked} onCheckedChange={setChecked} {...props}>
            {children}
        </CheckboxGroupPrimitive.Item>
    );
};

export default CheckboxCardsTrigger;
