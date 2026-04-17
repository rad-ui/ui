import React from 'react';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import Primitive from '~/core/primitives/Primitive';

export type RadioGroupPrimitiveIndicatorElement = React.ElementRef<typeof Primitive.span>;

export type RadioGroupPrimitiveIndicatorProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const RadioGroupPrimitiveIndicator = React.forwardRef<RadioGroupPrimitiveIndicatorElement, RadioGroupPrimitiveIndicatorProps>(
    ({ children, className, asChild = false, ...props }, ref) => {
        const { itemSelected } = React.useContext(RadioGroupPrimitiveItemContext);

        if (!itemSelected) return null;
        return <Primitive.span ref={ref} className={className} asChild={asChild} {...props}>{children}</Primitive.span>;
    }
);

RadioGroupPrimitiveIndicator.displayName = 'RadioGroupPrimitiveIndicator';

export default RadioGroupPrimitiveIndicator;
