import React from 'react';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import Primitive from '~/core/primitives/Primitive';

export type RadioGroupPrimitiveIndicatorElement = React.ElementRef<typeof Primitive.span>;

export type RadioGroupPrimitiveIndicatorProps = React.ComponentPropsWithoutRef<typeof Primitive.span> & {
    /** Keep it rendered while unselected (with `data-state="unchecked"`), for exit animations or reserved space. */
    forceMount?: boolean;
};

const RadioGroupPrimitiveIndicator = React.forwardRef<RadioGroupPrimitiveIndicatorElement, RadioGroupPrimitiveIndicatorProps>(
    ({ children, className, asChild = false, forceMount = false, ...props }, ref) => {
        const { itemSelected } = React.useContext(RadioGroupPrimitiveItemContext);

        if (!itemSelected && !forceMount) return null;
        return <Primitive.span ref={ref} className={className} asChild={asChild} data-state={itemSelected ? 'checked' : 'unchecked'} {...props}>{children}</Primitive.span>;
    }
);

RadioGroupPrimitiveIndicator.displayName = 'RadioGroupPrimitiveIndicator';

export default RadioGroupPrimitiveIndicator;
