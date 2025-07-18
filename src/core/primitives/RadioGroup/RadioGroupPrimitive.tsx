import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

import RadioGroupPrimitiveRoot, { RadioGroupPrimitiveRootProps } from './fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem, { RadioGroupPrimitiveItemProps } from './fragments/RadioGroupPrimitiveItem';
import RadioGroupPrimitiveIndicator, { RadioGroupPrimitiveIndicatorProps } from './fragments/RadioGroupPrimitiveIndicator';

export type RadioGroupProps = {
    children?: React.ReactNode;

} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

const RadioGroupPrimitive = () => {
    console.warn('Direct usage of RadioGroup is not supported. Please use RadioGroup.Root, RadioGroup.Item, etc. instead.');
    return null;
};

export namespace RadioGroupPrimitiveProps {
    export type Root = RadioGroupPrimitiveRootProps;
    export type Item = RadioGroupPrimitiveItemProps;
    export type Indicator = RadioGroupPrimitiveIndicatorProps;
}

RadioGroupPrimitive.Root = RadioGroupPrimitiveRoot;
RadioGroupPrimitive.Item = RadioGroupPrimitiveItem;
RadioGroupPrimitive.Indicator = RadioGroupPrimitiveIndicator;

export default RadioGroupPrimitive;
