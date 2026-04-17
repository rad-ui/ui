'use client';

import React from 'react';

export interface CheckboxCardsRootContextProps {
   rootClass: string
}

const CheckboxCardsRootContext = React.createContext<CheckboxCardsRootContextProps>({
    rootClass: ''
});

export default CheckboxCardsRootContext;
