'use client';

import React from 'react';

export interface MenubarMenuContextProps {
    id: string;
    isOpen: boolean
}

const MenubarMenuContext = React.createContext<MenubarMenuContextProps|null>(null);

export default MenubarMenuContext;
