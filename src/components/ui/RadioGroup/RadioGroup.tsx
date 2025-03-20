import React from 'react';
import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';

// Empty props type - only supporting fragment exports
export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const RadioGroup = () => {
    console.warn('Direct usage of RadioGroup is not supported. Please use RadioGroup.Root and RadioGroup.Item instead.');
    return null;
};

// Export fragments via direct assignment pattern
RadioGroup.Root = RadioGroupRoot;
RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
