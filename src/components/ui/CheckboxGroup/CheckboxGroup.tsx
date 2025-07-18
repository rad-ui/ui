'use client';

import CheckboxGroupRoot from './fragments/CheckboxGroupRoot';
import CheckboxGroupTrigger from './fragments/CheckboxGroupTrigger';
import CheckboxGroupItem from './fragments/CheckboxGroupItem';
import CheckboxGroupLabel from './fragments/CheckboxGroupLabel';
import CheckboxGroupIndicator from './fragments/CheckboxGroupIndicator';

const CheckboxGroup = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

CheckboxGroup.Root = CheckboxGroupRoot;
CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.Trigger = CheckboxGroupTrigger;
CheckboxGroup.Label = CheckboxGroupLabel;
CheckboxGroup.Indicator = CheckboxGroupIndicator;

export default CheckboxGroup;
