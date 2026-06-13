'use client';
import React from 'react';
import SelectContent from './fragments/SelectContent';
import SelectItem from './fragments/SelectItem';
import SelectTrigger from './fragments/SelectTrigger';
import SelectRoot from './fragments/SelectRoot';
import SelectIndicator from './fragments/SelectIndicator';
import SelectPortal from './fragments/SelectPortal';
import SelectGroup from './fragments/SelectGroup';

const SelectBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
});

SelectBase.displayName = 'Select';

interface SelectComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    Root: typeof SelectRoot;
    Content: typeof SelectContent;
    Item: typeof SelectItem;
    Trigger: typeof SelectTrigger;
    Portal: typeof SelectPortal;
    Group: typeof SelectGroup;
    Indicator: typeof SelectIndicator;
}

const Select = SelectBase as SelectComponent;

Select.Root = SelectRoot;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Trigger = SelectTrigger;
Select.Portal = SelectPortal;
Select.Group = SelectGroup;
Select.Indicator = SelectIndicator;

export type { SelectRootProps } from './fragments/SelectRoot';
export type { SelectContentProps } from './fragments/SelectContent';
export type { SelectItemProps } from './fragments/SelectItem';
export type { SelectTriggerProps } from './fragments/SelectTrigger';
export type { SelectPortalProps } from './fragments/SelectPortal';
export type { SelectGroupProps } from './fragments/SelectGroup';
export type { SelectIndicatorProps } from './fragments/SelectIndicator';
export default Select;
