import React, { useContext } from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioCardsContext } from '../context/RadioCardsContext';

import clsx from 'clsx';

export type RadioCardsItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;

export type RadioCardsItemProps = {
    children?: React.ReactNode;
    className?: string;
    value: string;
} & RadioGroupPrimitiveProps.Item;

const RadioCardsItem = React.forwardRef<RadioCardsItemElement, RadioCardsItemProps>(
    ({ children, className = '', value, ...props }, ref) => {
        const { rootClass } = useContext(RadioCardsContext);
        return <RadioGroupPrimitive.Item ref={ref} className={clsx(`${rootClass}-item`, className)} {...props} value={value}>{children}</RadioGroupPrimitive.Item>;
    }
);

RadioCardsItem.displayName = 'RadioCardsItem';

export default RadioCardsItem;
