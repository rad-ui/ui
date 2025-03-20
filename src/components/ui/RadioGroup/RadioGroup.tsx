import React from 'react';
import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';

// Empty props type - only supporting fragment exports for now
export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Minimal implementation - we're not supporting direct usage yet
const RadioGroup = ({ children, ...props }: RadioGroupProps) => {
    console.warn('Direct usage of RadioGroup is not supported yet. Please use RadioGroup.Root and RadioGroup.Item instead.');
    return <div {...props}>{children}</div>;
};

// Export fragments via direct assignment pattern
RadioGroup.Root = RadioGroupRoot;
RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
