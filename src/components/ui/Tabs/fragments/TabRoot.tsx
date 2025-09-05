'use client';
import React, { useEffect } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Tabs';

type TabRootElement = React.ElementRef<typeof RovingFocusGroup.Root>;
type RovingRootProps = Omit<React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>, 'orientation'>;
export type TabRootProps = RovingRootProps & {
    orientation?: 'horizontal' | 'vertical';
    customRootClass?: string;
    value?: string;
    color?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    activationMode?: 'automatic' | 'manual';
    asChild?: boolean;
};

const TabRoot = React.forwardRef<TabRootElement, TabRootProps>(({ 
    children,
    defaultValue = '',
    onValueChange = () => {},
    customRootClass = '',
    value,
    className,
    color,
    orientation = 'horizontal',
    dir = 'ltr',
    activationMode = 'automatic',
    asChild = false,
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const [tabValue, setTabValue] = useControllableState<string>(
        value,
        defaultValue || '',
        onValueChange
    );

    const handleTabChange = (value: string) => {
        setTabValue(value);
    };

    // Apply the default tab only when the component is uncontrolled. This
    // prevents overwriting a controlled state while still allowing the effect
    // to run if the consumer switches between controlled and uncontrolled
    // modes.
    useEffect(() => {
        if (value === undefined && defaultValue) {
            handleTabChange(defaultValue);
        }
        // Include `value` so the effect re-evaluates when the control state
        // changes.
    }, [defaultValue, value]);

    const contextValues = {
        rootClass,
        tabValue,
        handleTabChange,
        orientation,
        activationMode
    };

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-orientation'] = orientation;

    return (
        <TabsRootContext.Provider value={contextValues}>
            <RovingFocusGroup.Root
                ref={ref}
                orientation={orientation}
                loop
                dir={dir}
                className={clsx(rootClass, className)}
                data-rad-ui-accent-color={color}
                {...dataAttributes}
                {...props}
            >
                {children}
            </RovingFocusGroup.Root>
        </TabsRootContext.Provider>
    );
});

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
