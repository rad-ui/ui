'use client';
import React from 'react';
import { useFilter } from '~/core/hooks/useFilter';
import ComboboxContent from './fragments/ComboboxContent';
import ComboboxItem from './fragments/ComboboxItem';
import ComboboxTrigger from './fragments/ComboboxTrigger';
import ComboboxRoot from './fragments/ComboboxRoot';
import ComboboxIndicator from './fragments/ComboboxIndicator';
import ComboboxPortal from './fragments/ComboboxPortal';
import ComboboxEmpty from './fragments/ComboboxEmpty';
import ComboboxClear from './fragments/ComboboxClear';
import ComboboxGroup from './fragments/ComboboxGroup';
import ComboboxGroupLabel from './fragments/ComboboxGroupLabel';
import ComboboxSeparator from './fragments/ComboboxSeparator';
import ComboboxSearch from './fragments/ComboboxSearch';
import ComboboxChips from './fragments/ComboboxChips';
import ComboboxValue from './fragments/ComboboxValue';

const ComboboxBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Combobox is not supported. Please use Combobox.Root, Combobox.Content, etc. instead.');
    return null;
});

ComboboxBase.displayName = 'Combobox';

interface ComboboxComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    /** Text matchers for a custom `filter`: `contains`, `startsWith`, `endsWith`. */
    useFilter: typeof useFilter;
    Root: typeof ComboboxRoot;
    Content: typeof ComboboxContent;
    Item: typeof ComboboxItem;
    Trigger: typeof ComboboxTrigger;
    Portal: typeof ComboboxPortal;
    Empty: typeof ComboboxEmpty;
    Clear: typeof ComboboxClear;
    Group: typeof ComboboxGroup;
    GroupLabel: typeof ComboboxGroupLabel;
    Separator: typeof ComboboxSeparator;
    Indicator: typeof ComboboxIndicator;
    Search: typeof ComboboxSearch;
    Chips: typeof ComboboxChips;
    Value: typeof ComboboxValue;
}

const Combobox = ComboboxBase as ComboboxComponent;

Combobox.Root = ComboboxRoot;
Combobox.useFilter = useFilter;
Combobox.Content = ComboboxContent;
Combobox.Item = ComboboxItem;
Combobox.Trigger = ComboboxTrigger;
Combobox.Portal = ComboboxPortal;
Combobox.Empty = ComboboxEmpty;
Combobox.Clear = ComboboxClear;
Combobox.Group = ComboboxGroup;
Combobox.GroupLabel = ComboboxGroupLabel;
Combobox.Separator = ComboboxSeparator;
Combobox.Indicator = ComboboxIndicator;
Combobox.Search = ComboboxSearch;
Combobox.Chips = ComboboxChips;
Combobox.Value = ComboboxValue;

export type { ComboboxRootProps } from './fragments/ComboboxRoot';
export type { ComboboxEmptyProps } from './fragments/ComboboxEmpty';
export type { ComboboxClearProps } from './fragments/ComboboxClear';
export type { ComboboxContentProps } from './fragments/ComboboxContent';
export type { ComboboxGroupLabelProps } from './fragments/ComboboxGroupLabel';
export type { ComboboxSeparatorProps } from './fragments/ComboboxSeparator';
export type { ComboboxItemProps } from './fragments/ComboboxItem';
export type { ComboboxTriggerProps } from './fragments/ComboboxTrigger';
export type { ComboboxSearchProps } from './fragments/ComboboxSearch';
export type { ComboboxChipsProps, ComboboxChip } from './fragments/ComboboxChips';
export type { ComboboxValueProps } from './fragments/ComboboxValue';
// Named part exports let React Server Components use `import * as Combobox from '@radui/ui/Combobox'`;
// property access on the default export is undefined across the client boundary.
export {
    ComboboxRoot as Root,
    ComboboxContent as Content,
    ComboboxItem as Item,
    ComboboxTrigger as Trigger,
    ComboboxPortal as Portal,
    ComboboxEmpty as Empty,
    ComboboxClear as Clear,
    ComboboxGroup as Group,
    ComboboxGroupLabel as GroupLabel,
    ComboboxSeparator as Separator,
    ComboboxIndicator as Indicator,
    ComboboxSearch as Search,
    ComboboxChips as Chips,
    ComboboxValue as Value
};

export default Combobox;
