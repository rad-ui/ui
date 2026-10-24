'use client';

import React from 'react';

export interface CheckboxGroupPrimitiveTriggerContextProps {
    isChecked: boolean,
    /** A parent checkbox with only some items checked. */
    isIndeterminate?: boolean
}

const CheckboxGroupPrimitiveTriggerContext = React.createContext<CheckboxGroupPrimitiveTriggerContextProps>({
    isChecked: false
});

export default CheckboxGroupPrimitiveTriggerContext;
