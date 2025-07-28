'use client';

import React from 'react';

export interface ContextMenuContextProps {
    rootClass: string;
    setCoords: (coords: { x: number, y: number }) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const ContextMenuContext = React.createContext<ContextMenuContextProps|null>(null);

export default ContextMenuContext;
