import React from 'react';

export interface NavigationMenuRootContextProps {
    isOpen: string;
    setIsOpen: React.Dispatch<React.SetStateAction<string>>;
    rootClass: string;
    contentLoop: boolean;
}

const NavigationMenuRootContext = React.createContext<NavigationMenuRootContextProps>({
    isOpen: '',
    setIsOpen: () => {},
    rootClass: '',
    contentLoop: true
});

export default NavigationMenuRootContext;
