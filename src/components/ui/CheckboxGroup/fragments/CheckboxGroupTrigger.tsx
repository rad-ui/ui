import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';

export type CheckboxGroupTriggerProps = {
    children?: React.ReactNode
    className?: string
    value?: string
}& CheckboxGroupPrimitiveProps.Trigger
const CheckboxGroupTrigger = ({ children, className = '', value, ...props }: CheckboxGroupTriggerProps) => {
    const { rootClass } = React.useContext(CheckboxGroupRootContext);

    return (
        <CheckboxGroupPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} value={value} {...props}>
            <CheckboxGroupPrimitive.Content >
                {children}
            </CheckboxGroupPrimitive.Content>
        </CheckboxGroupPrimitive.Trigger>
    );
};

export default CheckboxGroupTrigger;
