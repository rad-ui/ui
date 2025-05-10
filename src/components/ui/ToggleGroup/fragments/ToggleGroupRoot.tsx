import React, { useState } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import { ToggleContext } from '../contexts/toggleContext';

type ToggleGroupRootProps ={
    /** Selection mode - 'single' allows only one item to be selected, 'multiple' allows many */
    type?: 'single' | 'multiple';
    /** Additional CSS class names to apply */
    className?: string;
    /** Whether focus should loop from last to first and vice versa */
    loop?: boolean;
    /** Orientation of the toggle group - affects keyboard navigation */
    orientation?: 'horizontal' | 'vertical';
    /** Custom root class name to override default styling */
    customRootClass?: string;
    /** Initial value or values for the toggle group */
    value?: any;
    /** Accent color for the toggle group */
    color?: string;
    /** Child elements */
    children?: React.ReactNode;
}

const COMPONENT_NAME = 'ToggleGroup';

const ToggleGroupRoot: React.FC<ToggleGroupRootProps> = ({
    type = 'multiple',
    className = '',
    loop = true,
    orientation = 'horizontal',
    customRootClass = '',
    value = null,
    color = '',
    children
}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

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
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return (
        <ToggleContext.Provider value={sendValues}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation} >
                <RovingFocusGroup.Group className={clsx(rootClass, className)} {...data_attributes}>
                    {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </ToggleContext.Provider>
    );
};

export default ToggleGroupRoot;
