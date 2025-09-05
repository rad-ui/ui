import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import RadioGroupPrimitive from '~/core/primitives/RadioGroup/RadioGroupPrimitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupIndicatorElement = ElementRef<typeof RadioGroupPrimitive.Indicator>;

export type RadioGroupIndicatorProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator> & {
    className?: string;
};

const RadioGroupIndicator = React.forwardRef<RadioGroupIndicatorElement, RadioGroupIndicatorProps>(({ className = '', children, ...props }, forwardedRef) => {
    const { rootClass } = React.useContext(RadioGroupContext);
    return (
        <RadioGroupPrimitive.Indicator ref={forwardedRef} className={clsx(`${rootClass}-indicator`, className)} {...props} >
            {children}
        </RadioGroupPrimitive.Indicator>
    );
});

RadioGroupIndicator.displayName = 'RadioGroupIndicator';

export default RadioGroupIndicator;
