'use client';

import React, { useState } from 'react';
import Switch from '@radui/ui/Switch';

const SwitchWrapper = () => {
    
    const [isChecked, setIsChecked] = useState(true) 

    const handleChange = (state) => {
        setIsChecked(state)

    }
    
    return <Switch checked={isChecked} onChange={handleChange} readOnly /> 

};

export default SwitchWrapper;
