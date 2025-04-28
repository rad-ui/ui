import React, { useState } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import { ToggleContext } from '../contexts/toggleContext';

/**
 * Props for the ToggleGroupRoot component
 * @typedef ToggleGroupRootProps
 */
interface ToggleGroupRootProps {
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
    /** Name of the component for CSS class generation */
    componentName?: string;
    /** Initial value or values for the toggle group */
    value?: any;
    /** Accent color for the toggle group */
    color?: string;
    /** Child elements */
    children?: React.ReactNode;
}

/**
 * Root component for ToggleGroup that provides context and layout.
 * Handles the state management for active toggles and provides accessibility
 * features through RovingFocusGroup for keyboard navigation.
 *
 * @example
 * <ToggleGroupRoot type="multiple" orientation="horizontal">
 *   <ToggleItem value="bold">B</ToggleItem>
 *   <ToggleItem value="italic">I</ToggleItem>
 * </ToggleGroupRoot>
 *
 * @param {ToggleGroupRootProps} props - Component props
 * @returns {JSX.Element} The ToggleGroupRoot component
 */
const ToggleGroupRoot: React.FC<ToggleGroupRootProps> = ({
    type = 'multiple',
    className = '',
    loop = true,
    orientation = 'horizontal',
    customRootClass = '',
    componentName = '',
    value = null,
    color = '',
    children
}) => {
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
