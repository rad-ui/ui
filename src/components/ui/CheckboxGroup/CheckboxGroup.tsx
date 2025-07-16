'use client';

import CheckboxGroupRoot from './fragments/CheckboxGroupRoot';
import CheckboxGroupItem from './fragments/CheckboxGroupItem';
import CheckboxGroupContent from './fragments/CheckboxGroupContent';
import CheckboxGroupIndicator from './fragments/CheckboxGroupIndicator';

const CheckboxGroup = () => {
    console.warn('Direct usage of CheckboxGroup is not supported. Please use CheckboxGroup.Root, CheckboxGroup.Item instead.');
    return null;
};

CheckboxGroup.Root = CheckboxGroupRoot;
CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.Content = CheckboxGroupContent;
CheckboxGroup.Indicator = CheckboxGroupIndicator;

export default CheckboxGroup;
