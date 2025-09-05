import React, { useContext, forwardRef, ElementRef } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import RadioGroupPrimitiveItem, { RadioGroupPrimitiveItemProps } from '~/core/primitives/RadioGroup/fragments/RadioGroupPrimitiveItem';
import { RadioCardsContext } from '../context/RadioCardsContext';

import clsx from 'clsx';

export type RadioCardsItemElement = ElementRef<typeof RadioGroupPrimitiveItem>;

type RadioCardsItemProps = RadioGroupPrimitiveItemProps & {
    children?: React.ReactNode;
    className?: string;
};

const RadioCardsItem = forwardRef<RadioCardsItemElement, RadioCardsItemProps>(
    ({ children, className = '', value, ...props }, ref) => {
        const { rootClass } = useContext(RadioCardsContext);
        return (
            <RadioGroupPrimitive.Item
                ref={ref}
                className={clsx(`${rootClass}-item`, className)}
                {...props}
                value={value}
            >
                {children}
            </RadioGroupPrimitive.Item>
        );
    }
);

RadioCardsItem.displayName = 'RadioCardsItem';

export default RadioCardsItem;
