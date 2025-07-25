'use client';

import CheckboxGroupPrimitiveRoot, { CheckboxGroupPrimitiveRootProps } from './fragments/CheckboxGroupPrimitiveRoot';
import CheckboxGroupPrimitiveTrigger, { CheckboxGroupPrimitiveTriggerProps } from './fragments/CheckboxGroupPrimitiveTrigger';
import CheckboxGroupPrimitiveContent, { CheckboxGroupPrimitiveContentProps } from './fragments/CheckboxGroupPrimitiveContent';

const CheckboxGroupPrimitive = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

export namespace CheckboxGroupPrimitiveProps {
    export type Root = CheckboxGroupPrimitiveRootProps;
    export type Trigger = CheckboxGroupPrimitiveTriggerProps;
    export type Content = CheckboxGroupPrimitiveContentProps;
}

CheckboxGroupPrimitive.Root = CheckboxGroupPrimitiveRoot;
CheckboxGroupPrimitive.Trigger = CheckboxGroupPrimitiveTrigger;
CheckboxGroupPrimitive.Content = CheckboxGroupPrimitiveContent;

export default CheckboxGroupPrimitive;
