'use client';

import React from 'react';

type PopoverPrimitivePortalContextType = {
    forceMount: boolean;
};

export const PopoverPrimitivePortalContext = React.createContext<PopoverPrimitivePortalContextType>({
    forceMount: false
});
