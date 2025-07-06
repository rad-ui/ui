import React from 'react';
import CheckboxPrimitiveIndicator from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveIndicator';

const CheckboxIndicator = ({ children, className = '', ...props }: CheckboxIndicatorProps) => (
    <CheckboxPrimitiveIndicator className={className} {...props}>
        {children}
    </CheckboxPrimitiveIndicator>
);

export default CheckboxIndicator;
