import React from 'react';

interface SelectRootContextType {
   rootClass: string;
}

export const SelectRootContext = React.createContext<SelectRootContextType>({
    rootClass: ''
});
