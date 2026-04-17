'use client';

import React from 'react';

export interface MenubarItem {
    id: string;
    state: 'open' | 'closed';
}

export interface MenubarContextProps {
    rootClass: string;
    registerItem: (id: string) => void;
    items: MenubarItem[];
    updateItemState: (id: string, state: 'open' | 'closed') => void;
}

const MenubarContext = React.createContext<MenubarContextProps|null>(null);

export default MenubarContext;
