import React from 'react';

export interface NavigationMenuRootContextProps {
    isOpen: string;
    setIsOpen: React.Dispatch<React.SetStateAction<string>>;
    rootClass: string;
}

const NavigationMenuRootContext = React.createContext<NavigationMenuRootContextProps>({
    isOpen: '',
    setIsOpen: () => {},
    rootClass: ''
});

export default NavigationMenuRootContext;
