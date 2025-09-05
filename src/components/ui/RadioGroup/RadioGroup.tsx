import React from 'react';
import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';
import RadioGroupIndicator from './fragments/RadioGroupIndicator';
import RadioGroupLabel from './fragments/RadioGroupLabel';

export type RadioGroupElement = React.ElementRef<'div'>;

export type RadioGroupProps = React.ComponentPropsWithoutRef<'div'> & {
    children?: React.ReactNode;
};

type RadioGroupComponent = React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<RadioGroupElement>> & {
    Root: typeof RadioGroupRoot;
    Item: typeof RadioGroupItem;
    Indicator: typeof RadioGroupIndicator;
    Label: typeof RadioGroupLabel;
};

const RadioGroup = React.forwardRef<RadioGroupElement, RadioGroupProps>((_props, _ref) => {
    console.warn('Direct usage of RadioGroup is not supported. Please use RadioGroup.Root and RadioGroup.Item instead.');
    return null;
}) as RadioGroupComponent;

RadioGroup.displayName = 'RadioGroup';

RadioGroup.Root = RadioGroupRoot;
RadioGroup.Item = RadioGroupItem;
RadioGroup.Indicator = RadioGroupIndicator;
RadioGroup.Label = RadioGroupLabel;

export default RadioGroup;
