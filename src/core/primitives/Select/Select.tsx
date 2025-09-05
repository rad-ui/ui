import SelectPrimitiveContent from './fragments/SelectPrimitiveContent';
import SelectPrimitiveItem from './fragments/SelectPrimitiveItem';
import SelectPrimitiveTrigger from './fragments/SelectPrimitiveTrigger';
import SelectPrimitiveRoot from './fragments/SelectPrimitiveRoot';
import SelectPrimitivePortal from './fragments/SelectPrimitivePortal';
import SelectPrimitiveGroup from './fragments/SelectPrimitiveGroup';
import SelectPrimitiveSearch from './fragments/SelectPrimitiveSearch';
import React from 'react';

const SelectPrimitiveBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Select is not supported. Please use Select.Root, Select.Content, etc. instead.');
    return null;
});

SelectPrimitiveBase.displayName = 'SelectPrimitive';

interface SelectPrimitiveComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    Root: typeof SelectPrimitiveRoot;
    Content: typeof SelectPrimitiveContent;
    Portal: typeof SelectPrimitivePortal;
    Item: typeof SelectPrimitiveItem;
    Trigger: typeof SelectPrimitiveTrigger;
    Group: typeof SelectPrimitiveGroup;
    Search: typeof SelectPrimitiveSearch;
}

const SelectPrimitive = SelectPrimitiveBase as SelectPrimitiveComponent;

SelectPrimitive.Root = SelectPrimitiveRoot;
SelectPrimitive.Content = SelectPrimitiveContent;
SelectPrimitive.Portal = SelectPrimitivePortal;
SelectPrimitive.Item = SelectPrimitiveItem;
SelectPrimitive.Trigger = SelectPrimitiveTrigger;
SelectPrimitive.Group = SelectPrimitiveGroup;
SelectPrimitive.Search = SelectPrimitiveSearch;

export default SelectPrimitive;
