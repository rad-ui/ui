'use client';

import CheckboxGroupPrimitiveRoot, { CheckboxGroupPrimitiveRootProps } from './fragments/CheckboxGroupPrimitiveRoot';
import CheckboxGroupPrimitiveItem, { CheckboxGroupPrimitiveItemProps } from './fragments/CheckboxGroupPrimitiveItem';

const CheckboxGroupPrimitive = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

export namespace CheckboxGroupPrimitiveProps  {
    export type Root = CheckboxGroupPrimitiveRootProps;
    export type Item = CheckboxGroupPrimitiveItemProps;
}

CheckboxGroupPrimitive.Root = CheckboxGroupPrimitiveRoot;
CheckboxGroupPrimitive.Item = CheckboxGroupPrimitiveItem;

export default CheckboxGroupPrimitive;
