'use client';
import React, { useEffect } from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Tabs';

export type TabRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    value?: string;
    color?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    activationMode?: 'automatic' | 'manual';
    asChild?: boolean;
};

const TabRoot = React.forwardRef<React.ElementRef<'div'>, TabRootProps>(({
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
}, forwardedRef) => {
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
        // Include `value` so the effect re-evaluates when the control state changes.
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
            <RovingFocusGroup.Root orientation={orientation} loop dir={dir} asChild>
                <Primitive.div
                    ref={forwardedRef}
                    className={clsx(rootClass, className)}
                    data-rad-ui-accent-color={color}
                    asChild={asChild}
                    {...dataAttributes}
                    {...props}
                >
                    {children}
                </Primitive.div>
            </RovingFocusGroup.Root>
        </TabsRootContext.Provider>
    );
});

TabRoot.displayName = COMPONENT_NAME;

export default TabRoot;
