import React, { ComponentPropsWithoutRef, ElementRef, useContext } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioGroupContext } from '../context/RadioGroupContext';
import clsx from 'clsx';

export type RadioGroupItemElement = ElementRef<typeof RadioGroupPrimitive.Item>;

export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    className?: string;
    value: string;
};

const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(({ children, className = '', value, ...props }, forwardedRef) => {
    const { rootClass } = useContext(RadioGroupContext);
    return <RadioGroupPrimitive.Item ref={forwardedRef} className={clsx(`${rootClass}-item`, className)} value={value} {...props}>{children}</RadioGroupPrimitive.Item>;
});

RadioGroupItem.displayName = 'RadioGroupItem';

export default RadioGroupItem;
