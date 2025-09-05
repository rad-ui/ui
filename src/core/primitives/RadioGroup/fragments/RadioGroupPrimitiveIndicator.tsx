import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import Primitive from '~/core/primitives/Primitive';

export type RadioGroupPrimitiveIndicatorElement = ElementRef<typeof Primitive.span>;

export type RadioGroupPrimitiveIndicatorProps = ComponentPropsWithoutRef<typeof Primitive.span> & {
    asChild?: boolean;
};

const RadioGroupPrimitiveIndicator = React.forwardRef<RadioGroupPrimitiveIndicatorElement, RadioGroupPrimitiveIndicatorProps>(
    ({ children, className, asChild = false, ...props }, forwardedRef) => {
        const { itemSelected } = React.useContext(RadioGroupPrimitiveItemContext);

        if (!itemSelected) return null;
        return (
            <Primitive.span ref={forwardedRef} className={className} asChild={asChild} {...props}>
                {children}
            </Primitive.span>
        );
    }
);

RadioGroupPrimitiveIndicator.displayName = 'RadioGroupPrimitiveIndicator';

export default RadioGroupPrimitiveIndicator;
