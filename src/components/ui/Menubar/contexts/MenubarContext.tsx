'use client';

import React from 'react';

export interface MenubarItem {
    id: string;
    state: 'open' | 'closed';
}

export interface MenubarContextProps {
    rootClass: string;
    registerItem: (id: string) => void;
    unregisterItem: (id: string) => void;
    items: MenubarItem[];
    updateItemState: (id: string, state: 'open' | 'closed') => void;
    updateItemTrigger: (id: string, trigger: HTMLButtonElement | null) => void;
    navigateMenu: (delta: 1 | -1) => void;
    openMenuOnHover: (id: string) => void;
    activeIndex: number;
    setActiveItem: (id: string) => void;
    contentInitialFocus?: number;
}

const MenubarContext = React.createContext<MenubarContextProps|null>(null);

export default MenubarContext;
