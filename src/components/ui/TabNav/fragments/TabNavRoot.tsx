import React, { useEffect, forwardRef } from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import TabNavContext from '../context/TabNav.context';
import useControllableState from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'TabNav';

export type TabNavRootProps = React.ComponentPropsWithoutRef<'div'> & {
    loop?: boolean,
    orientation?: 'horizontal' | 'vertical',
    customRootClass?: string,
    color?: string;
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
}

const TabNavRoot = forwardRef<React.ElementRef<'div'>, TabNavRootProps>(({
    className, loop = true, orientation = 'horizontal', children, color, customRootClass = '', defaultValue = '',
    onValueChange = () => {},
    value, ...props
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

    // Set the default tab only for uncontrolled usage to avoid clobbering a
    // controlled value passed from the parent. Including `value` as a
    // dependency lets the effect react if the component switches between
    // controlled and uncontrolled modes.
    useEffect(() => {
        if (value === undefined && defaultValue) {
            handleTabChange(defaultValue);
        }
    }, [defaultValue, value]);

    const contextValues = {
        rootClass,
        tabValue,
        handleTabChange
    };

    return (
        <TabNavContext.Provider value={contextValues}>
            <RovingFocusGroup.Root loop={loop} orientation={orientation} >
                <RovingFocusGroup.Group {...({ asChild: true } as any)}>
                    <div ref={ref} className={clsx(rootClass, className)} {...props}>
                        {children}
                    </div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TabNavContext.Provider>

    );
});

TabNavRoot.displayName = 'TabNavRoot';

export default TabNavRoot;
