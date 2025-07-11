import React, { useContext } from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveTypes } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import { RadioCardsContext } from '../context/RadioCardsContext';

import clsx from 'clsx';

const RadioCardsItem = ({ children, className = '', ...props }: { children: React.ReactNode } & RadioGroupPrimitiveTypes.Item) => {
    const { rootClass } = useContext(RadioCardsContext);
    return <RadioGroupPrimitive.Item className={clsx(`${rootClass}-item`, className)} {...props}>{children}</RadioGroupPrimitive.Item>;
};

export default RadioCardsItem;
