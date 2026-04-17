'use client';

import React from 'react';

export interface DropdownMenuContextProps {
    rootClass: string
}

const DropdownMenuContext = React.createContext<DropdownMenuContextProps|null>(null);

export default DropdownMenuContext;
