import React from 'react';
import CheckboxPrimitiveIndicator from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveIndicator';

export type CheckboxIndicatorProps = {
    children: React.ReactNode;
    className?: string;
}

const CheckboxIndicator = ({ children, className = '', ...props }: CheckboxIndicatorProps) => (
    <CheckboxPrimitiveIndicator className={className} {...props}>
        {children}
    </CheckboxPrimitiveIndicator>
);

export default CheckboxIndicator;
