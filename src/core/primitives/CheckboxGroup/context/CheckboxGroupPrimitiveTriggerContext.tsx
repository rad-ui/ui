'use client';

import React from 'react';

export interface CheckboxGroupPrimitiveTriggerContextProps {
    isChecked: boolean
}

const CheckboxGroupPrimitiveTriggerContext = React.createContext<CheckboxGroupPrimitiveTriggerContextProps>({
    isChecked: false
});

export default CheckboxGroupPrimitiveTriggerContext;
