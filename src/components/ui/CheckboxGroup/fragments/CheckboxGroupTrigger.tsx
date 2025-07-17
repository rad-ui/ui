import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import CheckboxGroupItemContext from '../context/CheckboxGroupItemContext';

export type CheckboxGroupTriggerProps = {
    children?: React.ReactNode
    className?: string
}
const CheckboxGroupTrigger = ({ children, className = '', ...props }: CheckboxGroupTriggerProps) => {
    const { rootClass } = React.useContext(CheckboxGroupRootContext);
    const { value, checked, setChecked } = React.useContext(CheckboxGroupItemContext);

    return (
        <CheckboxGroupPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} value={value} checked={checked} onCheckedChange={setChecked} {...props}>
            <CheckboxGroupPrimitive.Content >
                {children}
            </CheckboxGroupPrimitive.Content>
        </CheckboxGroupPrimitive.Trigger>
    );
};

export default CheckboxGroupTrigger;
