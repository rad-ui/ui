'use client';
import React from 'react';
import ComboboxContent from './fragments/ComboboxContent';
import ComboboxItem from './fragments/ComboboxItem';
import ComboboxTrigger from './fragments/ComboboxTrigger';
import ComboboxRoot from './fragments/ComboboxRoot';
import ComboboxIndicator from './fragments/ComboboxIndicator';
import ComboboxPortal from './fragments/ComboboxPortal';
import ComboboxGroup from './fragments/ComboboxGroup';

const ComboboxBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Combobox is not supported. Please use Combobox.Root, Combobox.Content, etc. instead.');
    return null;
});

ComboboxBase.displayName = 'Combobox';

interface ComboboxComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    Root: typeof ComboboxRoot;
    Content: typeof ComboboxContent;
    Item: typeof ComboboxItem;
    Trigger: typeof ComboboxTrigger;
    Portal: typeof ComboboxPortal;
    Group: typeof ComboboxGroup;
    Indicator: typeof ComboboxIndicator;
}

const Combobox = ComboboxBase as ComboboxComponent;

Combobox.Root = ComboboxRoot;
Combobox.Content = ComboboxContent;
Combobox.Item = ComboboxItem;
Combobox.Trigger = ComboboxTrigger;
Combobox.Portal = ComboboxPortal;
Combobox.Group = ComboboxGroup;
Combobox.Indicator = ComboboxIndicator;

export default Combobox;
