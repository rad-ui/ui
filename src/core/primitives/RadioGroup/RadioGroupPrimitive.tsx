import React from 'react';

import RadioGroupPrimitiveRoot, { RadioGroupPrimitiveRootProps } from './fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem, { RadioGroupPrimitiveItemProps } from './fragments/RadioGroupPrimitiveItem';
import RadioGroupPrimitiveIndicator, { RadioGroupPrimitiveIndicatorProps } from './fragments/RadioGroupPrimitiveIndicator';

export type RadioGroupPrimitiveElement = React.ElementRef<'div'>;

export type RadioGroupProps = React.ComponentPropsWithoutRef<'div'> & {
    children?: React.ReactNode;
};

type RadioGroupPrimitiveComponent = React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<RadioGroupPrimitiveElement>> & {
    Root: typeof RadioGroupPrimitiveRoot;
    Item: typeof RadioGroupPrimitiveItem;
    Indicator: typeof RadioGroupPrimitiveIndicator;
};

const RadioGroupPrimitive = React.forwardRef<RadioGroupPrimitiveElement, RadioGroupProps>((_props, _ref) => {
    console.warn('Direct usage of RadioGroup is not supported. Please use RadioGroup.Root, RadioGroup.Item, etc. instead.');
    return null;
}) as RadioGroupPrimitiveComponent;

RadioGroupPrimitive.displayName = 'RadioGroupPrimitive';

export namespace RadioGroupPrimitiveProps {
    export type Root = RadioGroupPrimitiveRootProps;
    export type Item = RadioGroupPrimitiveItemProps;
    export type Indicator = RadioGroupPrimitiveIndicatorProps;
}

RadioGroupPrimitive.Root = RadioGroupPrimitiveRoot;
RadioGroupPrimitive.Item = RadioGroupPrimitiveItem;
RadioGroupPrimitive.Indicator = RadioGroupPrimitiveIndicator;

export default RadioGroupPrimitive;
