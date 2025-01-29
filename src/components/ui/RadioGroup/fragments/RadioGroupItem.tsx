import React, { useContext } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioGroupContext } from '../context/RadioGroupContext';
import clsx from 'clsx';

const RadioGroupItem = ({ children, className = '', ...props }: { children: React.ReactNode } & RadioGroupPrimitive.ItemProps) => {
    const { defaultChecked, onChange, rootClass } = useContext(RadioGroupContext);
    return <RadioGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} {...props}>{children}</RadioGroupPrimitive.Item>;
};

export default RadioGroupItem;
