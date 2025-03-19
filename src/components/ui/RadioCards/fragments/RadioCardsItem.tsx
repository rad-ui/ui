import React, { useContext } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioCardsContext } from '../context/RadioCardsContext';

import clsx from 'clsx';

const RadioCardsItem = ({ children, className = '', ...props }: { children: React.ReactNode } & RadioGroupPrimitive.ItemProps) => {
    const { rootClass } = useContext(RadioCardsContext);
    return <RadioGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} {...props}>{children}</RadioGroupPrimitive.Item>;
};

export default RadioCardsItem;
