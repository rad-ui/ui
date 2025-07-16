import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupContext from '../context/CheckboxGroupContext';

export type CheckboxGroupItemProps = {
    children?: React.ReactNode
    value: string
    className?: string
    
}& CheckboxGroupPrimitiveProps.Item;
const CheckboxGroupItem = ({ children, className = '', value, ...props }: CheckboxGroupItemProps) => {
    const { rootClass } = React.useContext(CheckboxGroupContext);

    return (
    <CheckboxGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} value={value} {...props}>
        {children}
    </CheckboxGroupPrimitive.Item>
    );
    
};

export default CheckboxGroupItem;
