'use client';

import CheckboxGroupPrimitiveRoot from './fragments/CheckboxGroupPrimitiveRoot';
import CheckboxGroupPrimitiveItem from './fragments/CheckboxGroupPrimitiveItem';

const CheckboxGroupPrimitive = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

CheckboxGroupPrimitive.Root = CheckboxGroupPrimitiveRoot;
CheckboxGroupPrimitive.Item = CheckboxGroupPrimitiveItem;

export default CheckboxGroupPrimitive;
