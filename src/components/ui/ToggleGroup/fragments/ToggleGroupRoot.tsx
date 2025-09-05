import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import useControllableState from '~/core/hooks/useControllableState';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import { ToggleContext } from '../contexts/toggleContext';

type ToggleGroupRootElement = React.ElementRef<'div'>;
type ToggleGroupRootProps = React.ComponentPropsWithoutRef<'div'> & {
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
    /** Current value or values for the toggle group (controlled mode) */
    value?: any;
    /** Initial value or values for the toggle group (uncontrolled mode) */
    defaultValue?: any;
    /** Callback fired when value changes */
    onValueChange?: (value: any) => void;
    /** Accent color for the toggle group */
    color?: string;
    /** Whether the toggle group is disabled */
    disabled?: boolean;
    /** Text direction */
    dir?: 'ltr' | 'rtl';
    /** Whether to enable roving focus */
    rovingFocus?: boolean;
    /** Whether to render as a child element instead of a div */
    asChild?: boolean;
    /** Child elements */
    children?: React.ReactNode;
}

const COMPONENT_NAME = 'ToggleGroup';

const ToggleGroupRoot = forwardRef<ToggleGroupRootElement, ToggleGroupRootProps>(({
    type = 'single',
    className = '',
    loop = true,
    orientation = 'horizontal',
    customRootClass = '',
    value,
    defaultValue = [],
    onValueChange,
    color = '',
    disabled = false,
    dir = 'ltr',
    rovingFocus = true,
    asChild = false,
    children,
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    // Use controllable state for value management
    const [activeToggles, setActiveToggles] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const sendValues = {
        activeToggles,
        setActiveToggles,
        type,
        rootClass,
        disabled,
        orientation
    };

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    if (disabled) {
        data_attributes['data-disabled'] = '';
    }

    data_attributes['data-orientation'] = orientation as any;

    // If rovingFocus is disabled, render without RovingFocusGroup
    if (!rovingFocus) {
        return (
            <ToggleContext.Provider value={sendValues}>
                <div
                    ref={ref}
                    className={clsx(rootClass, className)}
                    {...data_attributes}
                    dir={dir}
                    {...props}
                >
                    {children}
                </div>
            </ToggleContext.Provider>
        );
    }

    return (
        <ToggleContext.Provider value={sendValues}>
            <RovingFocusGroup.Root
                loop={loop}
                orientation={orientation}
                dir={dir}
            >
                <RovingFocusGroup.Group
                    {...data_attributes}
                    {...props}
                >
                    <div ref={ref} className={clsx(rootClass, className)}>
                        {children}
                    </div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </ToggleContext.Provider>
    );
});

ToggleGroupRoot.displayName = COMPONENT_NAME;

export default ToggleGroupRoot;
