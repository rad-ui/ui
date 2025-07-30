'use client';

import React from 'react';

export interface MenubarContextProps {
    rootClass: string
}

const MenubarContext = React.createContext<MenubarContextProps|null>(null);

export default MenubarContext;
