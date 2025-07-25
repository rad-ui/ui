import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupIndicatorProps = {
    children?: React.ReactNode
    className?: string
} & RadioGroupPrimitiveProps.Indicator;

const RadioGroupIndicator = ({ className = '', children, ...props }: RadioGroupIndicatorProps) => {
    const { rootClass } = React.useContext(RadioGroupContext);
    return (
        <RadioGroupPrimitive.Indicator className={clsx(`${rootClass}-indicator`, className)} {...props} >
            {children}
        </RadioGroupPrimitive.Indicator>
    );
};

export default RadioGroupIndicator;
