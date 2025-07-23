'use client';

import React from 'react';

export interface MenuPrimitiveRootPrimitiveContextProps {
   isOpen: boolean
   setIsOpen: (open: boolean) => void
}

const MenuPrimitiveRootPrimitiveContext = React.createContext<MenuPrimitiveRootPrimitiveContextProps>({
    isOpen: false,
    setIsOpen: () => {}
});

export default MenuPrimitiveRootPrimitiveContext;
