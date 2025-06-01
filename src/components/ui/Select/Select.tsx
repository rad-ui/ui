'use client';
import SelectContent from './fragments/SelectContent';
import SelectItem from './fragments/SelectItem';
import SelectTrigger from './fragments/SelectTrigger';
import SelectRoot from './fragments/SelectRoot';
import SelectIndicator from './fragments/SelectIndicator';
import SelectPortal from './fragments/SelectPortal';

const Select = () => {
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
};

Select.Root = SelectRoot;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Trigger = SelectTrigger;
Select.Portal = SelectPortal;
Select.Indicator = SelectIndicator;

export default Select;
