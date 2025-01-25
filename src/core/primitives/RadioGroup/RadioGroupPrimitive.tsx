import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

import RadioGroupPrimitiveRoot from './fragments/RadioGroupPrimitiveRoot';
import RadioGroupPrimitiveItem from './fragments/RadioGroupPrimitiveItem';

export type RadioGroupProps = {
    children?: React.ReactNode;

} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

const RadioGroupPrimitive = {} as const;

RadioGroupPrimitive.Root = RadioGroupPrimitiveRoot;
RadioGroupPrimitive.Item = RadioGroupPrimitiveItem;

export default RadioGroupPrimitive;
