import React, { useState } from 'react';

import { customClassSwitcher } from '~/core';

import { ToggleContext } from '../contexts/toggleContext';

const ToggleGroupRoot = ({ type = 'multiple', className = '', customRootClass = '', componentName = '', value = null, children }:any) => {
    const rootClass = customClassSwitcher(customRootClass, componentName);

    // value can be either a string or an array of strings
    // if its null, then no toggles are active

    const [activeToggles, setActiveToggles] = useState(value || []);

    return (
        <div className={`${rootClass} ${className}`} role="group">
            <ToggleContext.Provider
                value={{
                    activeToggles,
                    setActiveToggles,
                    type
                }}>
                {children}
            </ToggleContext.Provider>
        </div>
    );
};

export default ToggleGroupRoot;
