import React from 'react';

interface SelectRootContextType {
   rootClass: string;
//    selectedId: string;
//    setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

export const SelectRootContext = React.createContext<SelectRootContextType>({
    rootClass: '',
    // selectedId: '',
    // setSelectedId: () => {}
});
