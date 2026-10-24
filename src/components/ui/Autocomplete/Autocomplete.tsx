'use client';
import React from 'react';
import AutocompleteRoot from './fragments/AutocompleteRoot';
import AutocompleteInput from './fragments/AutocompleteInput';
import AutocompleteContent from './fragments/AutocompleteContent';
import AutocompleteItem from './fragments/AutocompleteItem';
import AutocompleteGroup from './fragments/AutocompleteGroup';
import AutocompletePortal from './fragments/AutocompletePortal';
import AutocompleteEmpty from './fragments/AutocompleteEmpty';

const AutocompleteBase = React.forwardRef<unknown, Record<string, never>>((_props, _ref) => {
    console.warn('Direct usage of Autocomplete is not supported. Please use Autocomplete.Root, Autocomplete.Input, etc. instead.');
    return null;
});

AutocompleteBase.displayName = 'Autocomplete';

interface AutocompleteComponent extends React.ForwardRefExoticComponent<React.RefAttributes<unknown>> {
    Root: typeof AutocompleteRoot;
    Input: typeof AutocompleteInput;
    Content: typeof AutocompleteContent;
    Item: typeof AutocompleteItem;
    Group: typeof AutocompleteGroup;
    Portal: typeof AutocompletePortal;
    Empty: typeof AutocompleteEmpty;
}

const Autocomplete = AutocompleteBase as AutocompleteComponent;

Autocomplete.Root = AutocompleteRoot;
Autocomplete.Input = AutocompleteInput;
Autocomplete.Content = AutocompleteContent;
Autocomplete.Item = AutocompleteItem;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.Portal = AutocompletePortal;
Autocomplete.Empty = AutocompleteEmpty;

export type { AutocompleteRootProps } from './fragments/AutocompleteRoot';
export type { AutocompleteInputProps } from './fragments/AutocompleteInput';
export type { AutocompleteEmptyProps } from './fragments/AutocompleteEmpty';
export type { AutocompleteContentProps } from './fragments/AutocompleteContent';
export type { AutocompleteItemProps } from './fragments/AutocompleteItem';
// Named part exports let React Server Components use `import * as Autocomplete from '@radui/ui/Autocomplete'`;
// property access on the default export is undefined across the client boundary.
export {
    AutocompleteRoot as Root,
    AutocompleteInput as Input,
    AutocompleteContent as Content,
    AutocompleteItem as Item,
    AutocompleteGroup as Group,
    AutocompletePortal as Portal,
    AutocompleteEmpty as Empty
};

export default Autocomplete;
