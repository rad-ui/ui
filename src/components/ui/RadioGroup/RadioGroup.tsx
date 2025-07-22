import React from 'react';
import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';
import RadioGroupIndicator from './fragments/RadioGroupIndicator';
import RadioGroupLabel from './fragments/RadioGroupLabel';

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
RadioGroup.Indicator = RadioGroupIndicator;
RadioGroup.Label = RadioGroupLabel;

export default RadioGroup;
