'use client';

import React from 'react';

export interface CheckboxGroupContextProps {
   rootClass: string
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextProps>({
    rootClass: ''
});

export default CheckboxGroupContext;
