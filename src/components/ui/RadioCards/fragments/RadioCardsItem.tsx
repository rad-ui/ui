import React, { useContext } from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioCardsContext } from '../context/RadioCardsContext';

import clsx from 'clsx';

export type RadioCardsItemProps = {
    children?: React.ReactNode
    className?: string
    value: string
} & RadioGroupPrimitiveProps.Item

const RadioCardsItem = ({ children, className = '', value, ...props }: RadioCardsItemProps) => {
    const { rootClass } = useContext(RadioCardsContext);
    return <RadioGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} {...props} value={value}>{children}</RadioGroupPrimitive.Item>;
};

export default RadioCardsItem;
