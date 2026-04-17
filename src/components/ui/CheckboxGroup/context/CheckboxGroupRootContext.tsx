'use client';

import React from 'react';

export interface CheckboxGroupRootContextProps {
   rootClass: string
}

const CheckboxGroupRootContext = React.createContext<CheckboxGroupRootContextProps>({
    rootClass: ''
});

export default CheckboxGroupRootContext;
