import React, { useContext } from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioGroupContext } from '../context/RadioGroupContext';
import clsx from 'clsx';

export type RadioGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;

export type RadioGroupItemProps = {
    children: React.ReactNode;
    className?: string;
    value: string;
} & RadioGroupPrimitiveProps.Item;

const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
    ({ children, className = '', value, ...props }, ref) => {
        const { rootClass } = useContext(RadioGroupContext);
        return <RadioGroupPrimitive.Item ref={ref} className={clsx(`${rootClass}-item`, className)} value={value} {...props}>{children}</RadioGroupPrimitive.Item>;
    }
);

RadioGroupItem.displayName = 'RadioGroupItem';

export default RadioGroupItem;
