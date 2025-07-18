import React from 'react';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';

export type RadioGroupPrimitiveIndicatorProps = {
    children?: React.ReactNode
    className?: string
}
const RadioGroupPrimitiveIndicator = ({ children, className }: RadioGroupPrimitiveIndicatorProps) => {
    const { itemSelected } = React.useContext(RadioGroupPrimitiveItemContext);

    if (!itemSelected) return null;
    return <span className={className}>{children}</span>;
};

export default RadioGroupPrimitiveIndicator;