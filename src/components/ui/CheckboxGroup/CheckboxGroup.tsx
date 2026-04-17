'use client';

import CheckboxGroupRoot from './fragments/CheckboxGroupRoot';
import CheckboxGroupTrigger from './fragments/CheckboxGroupTrigger';
import CheckboxGroupLabel from './fragments/CheckboxGroupLabel';
import CheckboxGroupIndicator from './fragments/CheckboxGroupIndicator';

const CheckboxGroup = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

CheckboxGroup.Root = CheckboxGroupRoot;
CheckboxGroup.Trigger = CheckboxGroupTrigger;
CheckboxGroup.Label = CheckboxGroupLabel;
CheckboxGroup.Indicator = CheckboxGroupIndicator;

export type { CheckboxGroupRootProps } from './fragments/CheckboxGroupRoot';
export type { CheckboxGroupTriggerProps } from './fragments/CheckboxGroupTrigger';
export type { CheckboxGroupLabelProps } from './fragments/CheckboxGroupLabel';
export type { CheckboxGroupIndicatorProps } from './fragments/CheckboxGroupIndicator';
export default CheckboxGroup;
