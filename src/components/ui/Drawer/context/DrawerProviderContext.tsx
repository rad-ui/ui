'use client';

import React from 'react';

export type DrawerProviderContextValue = {
    /** Whether any drawer inside the provider is open. */
    active: boolean;
    /** A drawer reports it opened; the returned function reports it closed. */
    registerOpen: () => () => void;
};

const DrawerProviderContext = React.createContext<DrawerProviderContextValue | null>(null);

export default DrawerProviderContext;
