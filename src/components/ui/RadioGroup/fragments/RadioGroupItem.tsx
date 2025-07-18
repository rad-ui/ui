import React, { useContext } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioGroupContext } from '../context/RadioGroupContext';
import clsx from 'clsx';

export type RadioGroupItemProps = {
    children: React.ReactNode
    className?: string
    value: string
}

const RadioGroupItem = ({ children, className = '', value, ...props }: RadioGroupItemProps) => {
    const { rootClass } = useContext(RadioGroupContext);
    return <RadioGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} value={value} {...props}>{children}</RadioGroupPrimitive.Item>;
};

export default RadioGroupItem;
