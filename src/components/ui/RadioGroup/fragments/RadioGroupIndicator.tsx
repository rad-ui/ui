import React from 'react';
import RadioGroupPrimitive, { RadioGroupPrimitiveProps } from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupIndicatorElement = React.ElementRef<typeof RadioGroupPrimitive.Indicator>;

export type RadioGroupIndicatorProps = {
    children?: React.ReactNode;
    className?: string;
} & RadioGroupPrimitiveProps.Indicator;

const RadioGroupIndicator = React.forwardRef<RadioGroupIndicatorElement, RadioGroupIndicatorProps>(
    ({ className = '', children, ...props }, ref) => {
        const { rootClass } = React.useContext(RadioGroupContext);
        return (
            <RadioGroupPrimitive.Indicator ref={ref} className={clsx(`${rootClass}-indicator`, className)} {...props} >
                {children}
            </RadioGroupPrimitive.Indicator>
        );
    }
);

RadioGroupIndicator.displayName = 'RadioGroupIndicator';

export default RadioGroupIndicator;
