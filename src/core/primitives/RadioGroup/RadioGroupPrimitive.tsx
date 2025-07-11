import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

import RadioGroupPrimitiveRoot, { RadioGroupPrimitiveRootProps } from './fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem, { RadioGroupPrimitiveItemProps } from './fragments/RadioGroupPrimitiveItem';

export type RadioGroupProps = {
    children?: React.ReactNode;

} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

export namespace RadioGroupPrimitiveTypes {
  export type Root = RadioGroupPrimitiveRootProps;
  export type Item = RadioGroupPrimitiveItemProps;
}

const RadioGroupPrimitive = () => {
    console.warn('Direct usage of RadioGroup is not supported. Please use RadioGroup.Root, RadioGroup.Item, etc. instead.');
    return null;
};

RadioGroupPrimitive.Root = RadioGroupPrimitiveRoot;
RadioGroupPrimitive.Item = RadioGroupPrimitiveItem;

export default RadioGroupPrimitive;
