import React, { useState } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import { ToggleContext } from '../contexts/toggleContext';

const ToggleGroupRoot = ({ type = 'multiple', className = '', loop = true, direction = 'horizontal', customRootClass = '', componentName = '', value = null, color = '', children }:any) => {
    const rootClass = customClassSwitcher(customRootClass, componentName);

    // value can be either a string or an array of strings
    // if its null, then no toggles are active

    const [activeToggles, setActiveToggles] = useState(value || []);

    const sendValues = {
        activeToggles,
        setActiveToggles,
        type
    };

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return (
        <ToggleContext.Provider value={sendValues}>
            <RovingFocusGroup.Root loop={loop} direction={direction} className={clsx(rootClass, className)} {...data_attributes}>
                <RovingFocusGroup.Group >
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </ToggleContext.Provider>
    );
};

export default ToggleGroupRoot;
