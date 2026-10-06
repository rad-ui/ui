'use client';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
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
    loop?: boolean;
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
    loop = true,
    activationMode = 'automatic',
    asChild = false,
    ...props
}, forwardedRef) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [tabValue, setTabValue] = useControllableState<string>(
        value,
        defaultValue || '',
        onValueChange
    );

    const baseId = useId();

    const [customTriggerIds, setCustomTriggerIds] = useState<Record<string, string>>({});
    const registerTriggerId = useCallback((triggerValue: string, id: string | undefined) => {
        setCustomTriggerIds((previous) => {
            if (previous[triggerValue] === id) return previous;
            const next = { ...previous };
            if (id === undefined) delete next[triggerValue];
            else next[triggerValue] = id;
            return next;
        });
    }, []);

    const handleTabChange = (nextValue: string) => {
        // Re-selecting the active tab is not a change; don't notify consumers.
        if (nextValue === tabValue) return;
        setTabValue(nextValue);
    };

    // Re-apply `defaultValue` when the component switches from controlled to
    // uncontrolled (or `defaultValue` itself changes). Skipped on mount: the
    // initial state already equals `defaultValue`, and applying it again would
    // fire a spurious `onValueChange` before the user has interacted.
    const isFirstRenderRef = useRef(true);
    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }
        if (value === undefined && defaultValue) {
            handleTabChange(defaultValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue, value]);

    const contextValues = {
        rootClass,
        baseId,
        tabValue,
        handleTabChange,
        orientation,
        activationMode,
        customTriggerIds,
        registerTriggerId
    };

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-orientation'] = orientation;

    return (
        <TabsRootContext.Provider value={contextValues}>
            <RovingFocusGroup.Root
                orientation={orientation}
                loop={loop}
                dir={dir}
                asChild
            >
                <Primitive.div
                    ref={forwardedRef}
                    className={clsx(rootClass, className)}
                    data-color={color}
                    data-slot="tabs-root"
                    dir={dir}
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
