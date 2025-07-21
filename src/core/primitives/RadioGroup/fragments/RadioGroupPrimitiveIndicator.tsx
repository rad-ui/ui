import React from 'react';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import Primitive from '~/core/primitives/Primitive';

export type RadioGroupPrimitiveIndicatorProps = {
    children?: React.ReactNode
    className?: string
    asChild?: boolean
}
const RadioGroupPrimitiveIndicator = ({ children, className, asChild = false, ...props }: RadioGroupPrimitiveIndicatorProps) => {
    const { itemSelected } = React.useContext(RadioGroupPrimitiveItemContext);

    if (!itemSelected) return null;
    return <Primitive.span className={className} asChild={asChild} {...props}>{children}</Primitive.span>;
};

export default RadioGroupPrimitiveIndicator;
