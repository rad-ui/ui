import React from 'react';

export interface NavigationMenuItemContextProps {
   itemOpen: boolean,
   handleTrigger: () => void
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextProps>({
    itemOpen: false,
    handleTrigger: () => {}
});

export default NavigationMenuItemContext;
