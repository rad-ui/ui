import React, { useEffect, useRef, forwardRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import TabNavContext from '../context/TabNav.context';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'TabNav';

export type TabNavRootProps = React.ComponentPropsWithoutRef<'nav'> & {
    loop?: boolean,
    orientation?: 'horizontal' | 'vertical',
    customRootClass?: string,
    color?: string;
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
}

const TabNavRoot = forwardRef<HTMLElement, TabNavRootProps>(({
    className, loop = true, orientation = 'horizontal', children, color, customRootClass = '', defaultValue = '',
    onValueChange = () => {},
    value, ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [tabValue, setTabValue] = useControllableState<string>(
        value,
        defaultValue || '',
        onValueChange
    );

    const handleTabChange = (nextValue: string) => {
        if (nextValue === tabValue) return;
        setTabValue(nextValue);
    };

    // Set the default tab only for uncontrolled usage to avoid clobbering a
    // controlled value passed from the parent. Including `value` as a
    // dependency lets the effect react if the component switches between
    // controlled and uncontrolled modes.
    // Skipped on mount: the initial state already equals `defaultValue`.
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
        tabValue,
        handleTabChange
    };

    return (
        <TabNavContext.Provider value={contextValues}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation}>
                <RovingFocusGroup.Group {...({ asChild: true } as any)}>
                    {/* A navigation landmark (label it with aria-label / aria-labelledby). The roving
                        group's role="group" is dropped so the <nav> keeps its landmark role. */}
                    <nav
                        ref={ref}
                        className={clsx(rootClass, className)}
                        data-orientation={orientation}
                        data-slot="tab-nav-root"
                        role={undefined}
                        {...props}
                    >
                        {children}
                    </nav>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TabNavContext.Provider>

    );
});

TabNavRoot.displayName = 'TabNavRoot';

export default TabNavRoot;
