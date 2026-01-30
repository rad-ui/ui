import ComboboxPrimitiveContent from './fragments/ComboboxPrimitiveContent';
import ComboboxPrimitiveItem from './fragments/ComboboxPrimitiveItem';
import ComboboxPrimitiveTrigger from './fragments/ComboboxPrimitiveTrigger';
import ComboboxPrimitiveRoot from './fragments/ComboboxPrimitiveRoot';
import ComboboxPrimitivePortal from './fragments/ComboboxPrimitivePortal';
import ComboboxPrimitiveGroup from './fragments/ComboboxPrimitiveGroup';
import ComboboxPrimitiveSearch from './fragments/ComboboxPrimitiveSearch';
import React from 'react';

const ComboboxPrimitiveBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Combobox is not supported. Please use Combobox.Root, Combobox.Content, etc. instead.');
    return null;
});

ComboboxPrimitiveBase.displayName = 'ComboboxPrimitive';

interface ComboboxPrimitiveComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    Root: typeof ComboboxPrimitiveRoot;
    Content: typeof ComboboxPrimitiveContent;
    Portal: typeof ComboboxPrimitivePortal;
    Item: typeof ComboboxPrimitiveItem;
    Trigger: typeof ComboboxPrimitiveTrigger;
    Group: typeof ComboboxPrimitiveGroup;
    Search: typeof ComboboxPrimitiveSearch;
}

const ComboboxPrimitive = ComboboxPrimitiveBase as ComboboxPrimitiveComponent;

ComboboxPrimitive.Root = ComboboxPrimitiveRoot;
ComboboxPrimitive.Content = ComboboxPrimitiveContent;
ComboboxPrimitive.Portal = ComboboxPrimitivePortal;
ComboboxPrimitive.Item = ComboboxPrimitiveItem;
ComboboxPrimitive.Trigger = ComboboxPrimitiveTrigger;
ComboboxPrimitive.Group = ComboboxPrimitiveGroup;
ComboboxPrimitive.Search = ComboboxPrimitiveSearch;

export default ComboboxPrimitive;
