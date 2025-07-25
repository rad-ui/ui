'use client';

import React from 'react';

export interface RadioGroupPrimitiveItemContextProps {
    itemSelected: boolean
}

const RadioGroupPrimitiveItemContext = React.createContext<RadioGroupPrimitiveItemContextProps>({
    itemSelected: false
});

export default RadioGroupPrimitiveItemContext;
