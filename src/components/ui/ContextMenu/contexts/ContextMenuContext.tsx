'use client';

import React from 'react';

export interface ContextMenuContextProps {
    rootClass: string;
    setIsOpen: (isOpen: boolean) => void;
    variant?: string;
    size?: string;
}

const ContextMenuContext = React.createContext<ContextMenuContextProps|null>(null);

export default ContextMenuContext;
