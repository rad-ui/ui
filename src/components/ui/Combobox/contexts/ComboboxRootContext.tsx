import React from 'react';

interface ComboboxRootContextType {
   rootClass: string;
}

export const ComboboxRootContext = React.createContext<ComboboxRootContextType>({
    rootClass: ''
});
