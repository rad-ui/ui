import React from 'react';

export type AutocompleteMode = 'list' | 'both' | 'inline' | 'none';

export type AutocompleteRootContextValue = {
    rootClass: string;
    autoHighlight?: boolean | 'always';
    openOnInputClick?: boolean;
    submitOnItemClick?: boolean;
    mode?: AutocompleteMode;
};

export const AutocompleteRootContext = React.createContext<AutocompleteRootContextValue>({ rootClass: '' });
