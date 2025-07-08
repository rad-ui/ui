import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

import RadioGroupPrimitiveRoot from './fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem from './fragments/RadioGroupPrimitiveItem';

export type RadioGroupProps = {
    children?: React.ReactNode;

} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

// Define the shape of the RadioGroupPrimitive object
export interface RadioGroupPrimitiveType {
    Root: typeof RadioGroupPrimitiveRoot;
    Item: typeof RadioGroupPrimitiveItem;
}

const RadioGroupPrimitive: RadioGroupPrimitiveType = {
    Root: RadioGroupPrimitiveRoot,
    Item: RadioGroupPrimitiveItem,
};

export default RadioGroupPrimitive;
